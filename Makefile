all:
	- @docker-compose up -d --build

react:
	- @docker exec -it react /bin/sh

django:
	- @docker exec -it django zsh

clean:
	- @docker ps -aq | xargs docker stop | xargs docker rm
	- @docker system prune --all --force --remove-orphans
	- @docker volume prune --force
	- @docker network prune --force

migrate:
	@docker exec -it django python3 manage.py makemigrations
	@docker exec -it django python3 manage.py migrate

db:
	@docker exec -it django python3 manage.py shell

re: clean all

.PHONY: all react django clean migrate db re