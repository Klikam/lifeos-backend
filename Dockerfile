FROM node:26.2.0-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --ignore-scripts

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]