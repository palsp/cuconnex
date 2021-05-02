FROM node:alpine

WORKDIR /app
COPY package.json .
RUN  yarn --prod
COPY ./build .

CMD ["yarn" , "start"]