FROM node:20-alpine AS builder

WORKDIR /app

ENV HUSKY=0

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build-css

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HUSKY=0
ENV PORT=9001

COPY package.json package-lock.json ./
RUN sed -i '/"prepare"/d' package.json
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY .env.production ./

EXPOSE 9001

CMD ["npm", "run", "start"]