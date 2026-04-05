#!/bin/sh
mkdir -p /directus/uploads
if [ "$(id -u)" = 0 ]; then
  chown -R node:node /directus/uploads 2>/dev/null || true
  chmod -R u+rwX,g+rwX /directus/uploads 2>/dev/null || true
  exec su-exec node /usr/local/bin/docker-entrypoint.sh "$@"
fi
exec /usr/local/bin/docker-entrypoint.sh "$@"
