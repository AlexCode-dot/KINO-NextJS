FROM node:20-alpine AS builder
WORKDIR /app
ENV HUSKY=0
ARG mongodb_uri
ARG omdb_api_key
ARG deepl_api_key
RUN if [ -n "$mongodb_uri" ]; then echo "MONGODB_URI=$mongodb_uri" > .env.production; fi
RUN if [ -n "$omdb_api_key" ]; then echo "OMDB_API_KEY=$omdb_api_key" >> .env.production; fi
RUN if [ -n "$deepl_api_key" ]; then echo "DEEPL_API_KEY=$deepl_api_key" >> .env.production; fi
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
COPY --from=builder /app/.env.production ./
EXPOSE 9001
CMD ["npm", "run", "start"]