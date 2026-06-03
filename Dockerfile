FROM node:26.2.0-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --ignore-scripts

COPY . .

RUN pnpm run build

# remove src and node_modules to reduce image size
RUN rm -rf src node_modules && pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]