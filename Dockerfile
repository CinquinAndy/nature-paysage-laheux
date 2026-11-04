# The image of the site: one Next.js server (Payload inside), built by Coolify.
#
# - Node 24 LTS, patched (24.22.1 fixes CVE-2026-111497, the Brotli decoder). The base image is
#   pinned by version AND digest: Renovate proposes the next one.
# - The build WRITES to the database named by DATABASE_URI (`pnpm run build` migrates, then
#   `next build` reads). Coolify hands the variables to `docker build` as build arguments and
#   adds the database to the build's hosts, which is why this is a Dockerfile and not Railpack
#   (the Railpack builder of this Coolify ignores those hosts).
# - The arguments below are build-stage only. They are never copied to the final image, whose
#   variables are given by Coolify when the container starts.
# - pnpm-lock.yaml is the lockfile in use (bun.lock is stale).

# 1. Build, on the Node version that runs the server.
FROM node:24.22.2-bookworm-slim@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.34.5 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG S3_BUCKET
ARG S3_ENDPOINT
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET_ACCESS_KEY
ARG S3_REGION
ARG FORVOYEZ_TOKEN
ARG GEMINI_API_KEY
ARG RESEND_TOKEN
ARG REVALIDATE_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG TURNSTILE_SECRET_KEY
# Décalage de version (page ouverte avant un déploiement) : voir src/scripts/build-ids.mjs.
# - Clé des Server Actions stable d'un build à l'autre (dérivée de PAYLOAD_SECRET, sauf si Coolify fournit
#   NEXT_SERVER_ACTIONS_ENCRYPTION_KEY) : l'identifiant de submitContactForm ne change plus à chaque déploiement.
# - .deployment-id : `deploymentId` de next.config.mjs, le commit si Coolify passe SOURCE_COMMIT.
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG SOURCE_COMMIT
ENV NEXT_TELEMETRY_DISABLED=1
RUN node src/scripts/build-ids.mjs deployment-id > .deployment-id \
	&& NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-$(node src/scripts/build-ids.mjs server-actions-key)}" \
	pnpm run build

# 2. What runs. The app is copied whole: `next start` needs .next, node_modules and the sources
#    that next.config.mjs and the Payload config import.
FROM node:24.22.2-bookworm-slim@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app ./
# Never root: `node` is the unprivileged user of the base image.
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
