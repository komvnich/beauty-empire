#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ROOT}/.env.railway"
if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  set +a
fi

if [[ -z "${DB_CONNECTION_STRING:-}" ]]; then
  echo "Задайте DB_CONNECTION_STRING: скопируйте DATABASE_URL из Railway (Postgres) в ${ENV_FILE}" >&2
  echo "Или: export DB_CONNECTION_STRING='postgresql://...' и запустите снова." >&2
  exit 1
fi

EMAIL="${1:?Использование: $0 <email> <password> <admin-role-uuid>}"
PASS="${2:?}"
ROLE_ID="${DIRECTUS_ADMIN_ROLE_ID:-${3:-}}"
if [[ -z "$ROLE_ID" ]]; then
  echo "Нужен UUID роли Administrator (поле role в directus_users — UUID, не имя)." >&2
  echo "В Postgres: SELECT id FROM directus_roles WHERE name = 'Administrator';" >&2
  echo "Передайте 3-м аргументом или задайте DIRECTUS_ADMIN_ROLE_ID." >&2
  exit 1
fi

DOCKER_ENV=( -e DB_CLIENT=pg -e DB_CONNECTION_STRING="$DB_CONNECTION_STRING" )
if [[ "${RAILWAY_NODE_TLS_INSECURE:-1}" != "0" ]]; then
  DOCKER_ENV+=( -e NODE_TLS_REJECT_UNAUTHORIZED=0 )
fi

docker run --rm "${DOCKER_ENV[@]}" \
  directus/directus:11.3.1 \
  node /directus/cli.js users create --email "$EMAIL" --password "$PASS" --role "$ROLE_ID"

echo "Готово. Вход в админку Directus: email и пароль выше."
