# Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app

# Копируем как package.json, так и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем pnpm и зависимости
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Билдим приложение
FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build:production

# Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["pnpm", "start"]
