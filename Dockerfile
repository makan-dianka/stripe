FROM python:3.8
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install vim -y

WORKDIR /var/www/
ADD python3 .

WORKDIR /var/www/web

RUN pip install -r requirements.txt