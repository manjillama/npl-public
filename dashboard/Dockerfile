FROM node:14-alpine

WORKDIR '/app'

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

# Copy not exactly necessary anymore as we're mapping all the local files into the container through docker volumes
COPY . .

CMD ["yarn", "start"]