# syntax=docker/dockerfile:1
# Multi-stage build for Next.js 14 standalone. Produces a small runtime image
# (no node_modules in the final layer) that fits comfortably in the Free Pilot
# 512 MB tier. Coolify auto-detects the Dockerfile and uses Docker buildpack.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create a non-root user. Doesn't strictly matter for an isolated container,
# but it's a low-cost good habit + matches what most prod templates do.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Standalone output already includes the minimal node runtime + server.js.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
