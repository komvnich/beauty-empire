FROM directus/directus:11.3.1

USER root
RUN apk add --no-cache su-exec

COPY railway-entrypoint.sh /railway-entrypoint.sh
RUN chmod +x /railway-entrypoint.sh

ENV STORAGE_LOCATIONS=local
ENV STORAGE_LOCAL_DRIVER=local
ENV STORAGE_LOCAL_ROOT=/directus/uploads

USER root
ENTRYPOINT ["/railway-entrypoint.sh"]
