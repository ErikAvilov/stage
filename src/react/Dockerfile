FROM node:20

WORKDIR /app

COPY ./next-app/ .

# i = install
RUN npm i

RUN npm i axios
RUN npm i react-bootstrap bootstrap

RUN npm i @tanstack/react-query
RUN npm i @tanstack/eslint-plugin-query

EXPOSE 3000

CMD ["npm", "run", "dev"]