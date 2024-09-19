FROM python:3.9

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update && \
	apt-get install -y zsh && \
	pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "control_db.asgi:application", "--reload", "--host", "0.0.0.0", "--port", "8000"]