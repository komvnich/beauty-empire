#!/bin/sh
set -e
mkdir -p /directus/uploads /directus/extensions
if [ "$(id -u)" = 0 ]; then
  chown -R node:node /directus/uploads /directus/extensions
  chmod -R u+rwX,g+rwX /directus/uploads /directus/extensions
  exec su-exec node /usr/local/bin/docker-entrypoint.sh "$@"
fi
exec /usr/local/bin/docker-entrypoint.sh "$@"
