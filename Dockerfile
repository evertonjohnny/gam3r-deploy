FROM node:lts-alpine3.22

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/core/package.json ./packages/core/package.json

COPY . .

RUN npm i

ARG NEXT_PUBLIC_API_URL="http://localhost:4000"
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ENV DATABASE_URL=""
ENV DIRECT_URL=""

RUN cd ./apps/api/prisma && npx prisma generate

RUN cd ./

RUN npm run build

EXPOSE 4000 3000
CMD ["npm", "run", "start"]