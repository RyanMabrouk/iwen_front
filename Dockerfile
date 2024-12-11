# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.7.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
ENV NODE_ENV=production
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm run build && rm -rf node_modules

FROM base AS final
ENV NODE_ENV=production

# Ensure the .pnpm-store directory has the correct permissions
RUN mkdir -p /home/node/.pnpm-store && chown -R node:node /home/node/.pnpm-store

# Switch to root to change permissions
USER root

# Copy built files before changing permissions
COPY --from=build /usr/src/app/.next ./.next
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

# Change ownership and set permissions
RUN chown -R node:node .next && chmod -R 755 .next

# Switch back to non-root user
USER node

EXPOSE 3000
CMD ["pnpm", "start"]