FROM node:20

WORKDIR /app

COPY ./next-app/ .

RUN npm install

RUN npm install axios

EXPOSE 3000

CMD ["npm", "run", "dev"]