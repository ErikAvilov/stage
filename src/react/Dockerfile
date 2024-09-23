FROM node:20

WORKDIR /app

COPY ./next-app/ .

RUN npm install

RUN npm install axios
RUN npm install react-bootstrap bootstrap

EXPOSE 3000

CMD ["npm", "run", "dev"]