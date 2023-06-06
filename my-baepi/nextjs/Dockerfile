FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Development image, install additional dependencies and start development server
FROM deps AS dev
RUN npm install --global nodemon
COPY . .

# Set environment variables for development
ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

# Expose ports for development server
EXPOSE 3000

CMD ["npm", "run", "dev"]
