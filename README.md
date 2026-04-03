# Beauty Empire

Монорепозиторий: сайт на Next.js и скрипты / конфигурация Directus CMS.

## Структура

| Каталог | Назначение |
|---------|------------|
| `beauty-site/` | Next.js 16 (лендинг, блог, `NEXT_PUBLIC_DIRECTUS_URL`) |
| `directus-cms/` | Docker Compose, `setup-*.js` для схемы CMS, Railway (`Dockerfile`, `railway.toml`) |
| `design/` | Дизайн-ассеты (локально) |
| `docs/` | Документация (локально) |

## Быстрый старт

### CMS (локально)

```bash
cd directus-cms
docker compose up -d
```

Далее при необходимости: `node setup-cms.js`, `node setup-blog.js` и остальные `setup-*.js` (см. каталог).

### Сайт

```bash
cd beauty-site
cp .env.example .env
bun install
bun run dev
```

Переменные: см. `beauty-site/.env.example`.

## Деплой

- **Directus на Railway:** root directory `directus-cms`, volume на `/directus/uploads` (см. комментарии в `directus-cms/railway.toml`).
- **Сайт:** отдельный сервис, root `beauty-site`, `NEXT_PUBLIC_DIRECTUS_URL` и `NEXT_PUBLIC_SITE_URL` на продакшен-URL.

## Лицензия

Private / уточните у владельца проекта.
