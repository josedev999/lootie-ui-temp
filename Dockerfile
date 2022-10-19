FROM node:16.10-alpine as buildContainer

WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm ci --ignore-scripts --no-optional --loglevel verbose

RUN npm -v
RUN node -v

COPY . /app
RUN npm run build:ssr

FROM node:16.10-alpine

RUN apk --update add bash && \
    apk add --no-cache dos2unix g++ git make file python3 nginx vips-dev

RUN file --version

RUN npm install pm2 -g
RUN npm install concurrently -g

WORKDIR /app

COPY ./.nginx/nginx.conf /etc/nginx
COPY ./.nginx/.htpasswd /etc/nginx/.htpasswd
COPY ./entrypoint.sh ./entrypoint.sh

COPY --from=buildContainer /app/package.json /app
COPY --from=buildContainer /app/dist /app/dist

RUN chmod +x ./entrypoint.sh
RUN dos2unix ./entrypoint.sh

ENV NODE_ENV production

EXPOSE 7777 80

ENTRYPOINT /bin/bash -x ./entrypoint.sh
