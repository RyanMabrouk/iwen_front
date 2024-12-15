# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.7.0

# ---- Base Stage ----
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# ---- Dependencies Stage ----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm, utilizing cache to speed up builds
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# ---- Build Stage ----
FROM deps AS build
COPY . ./
ENV NODE_ENV=production

# Build the Next.js application
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm run build 

# ---- Final Stage ----
FROM base AS final
ENV NODE_ENV=production

# Create .pnpm-store directory and set ownership to node user
RUN mkdir -p /home/node/.pnpm-store && \
    chown -R node:node /home/node/.pnpm-store

# Switch to root user to adjust permissions
USER root

# Copy built files from the build stage
COPY --from=build /usr/src/app/. ./.
COPY package.json pnpm-lock.yaml ./

# Ensure .next/cache/images directory exists and set ownership
RUN mkdir -p .next/cache/images && \
    chown -R node:node .next

# Adjust permissions for .next directory
RUN chmod -R 755 .next

# Switch back to the non-root 'node' user for security
USER node

# Expose the desired port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]