FROM node:14.19-alpine

WORKDIR '/app'

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3005

CMD ["yarn", "start"]
