# stage 1: build
FROM node:12 AS builder

RUN mkdir -p /build/app
COPY . /build/app

WORKDIR /build/app
RUN npm install
RUN npm install grunt-cli

ENV NODE_ENV production
RUN npm run build-frontend
RUN npm uninstall grunt-cli

# stage 1: runner
FROM node:12-slim AS runner

RUN mkdir -p /opt/app
RUN mkdir -p /opt/data

COPY --from=builder /build/app /opt/app
VOLUME /opt/data

ARG METABASE_EXTERNAL_URL
ENV METABASE_URL ${METABASE_URL}
ENV METABASE_EXTERNAL_URL ${METABASE_EXTERNAL_URL}
ENV METABASE_API_USERNAME ${METABASE_API_USERNAME}
ENV METABASE_API_PASSWORD ${METABASE_API_PASSWORD}
ENV METABASE_API_KEY ${METABASE_API_KEY}
ENV DATA_DIRECTORY /opt/data
ENV NODE_ENV production

WORKDIR /opt/app
RUN npm run build-react
RUN npm prune --production

HEALTHCHECK --interval=30s \
    --timeout=1s \
    --start-period=5s \
    --retries=3 \
    CMD curl --fail http://localhost:3000/health || exit 1

EXPOSE 3000/tcp
ENTRYPOINT [ "node", "index.js" ]
