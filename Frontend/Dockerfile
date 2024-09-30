FROM node:20.1 as build

WORKDIR /app

EXPOSE 3000

COPY /Frontend/package*.json .

RUN npm install

COPY /Frontend/. ./

CMD ["npm", "run", "dev"]