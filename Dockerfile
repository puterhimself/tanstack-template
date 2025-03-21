FROM oven/bun:1.0 as base

# Set the working directory
WORKDIR /app

# Install dependencies
FROM base as deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the app
FROM deps as builder
COPY . .
RUN bun run build

# Production image
FROM base as runner
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Expose port
EXPOSE 3000

# Start the app
CMD ["bun", "run", "start"] 