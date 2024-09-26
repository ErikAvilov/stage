FROM node:20

WORKDIR /app

COPY ./next-app/ .
# zsh for convenience and java for open-api
RUN apt-get update && apt-get install -y \
	zsh \
	default-jre
# i = install
RUN npm i
# axios instead of fetch
RUN npm i axios
# might be useless since next + tailwind
RUN npm i react-bootstrap bootstrap
# react-query
RUN npm i @tanstack/react-query
RUN npm i @tanstack/eslint-plugin-query
# open-api
RUN npm i @openapitools/openapi-generator-cli -g

EXPOSE 3000

CMD ["npm", "run", "dev"]