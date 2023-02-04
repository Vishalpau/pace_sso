# From 176023829637.dkr.ecr.eu-west-1.amazonaws.com/devops:python-3.8.8-alpine
FROM python:3.8.8-alpine

RUN apk update 
# \
# && apk add --no-install-recommends \
# && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add build-base openldap-dev python3-dev postgresql-dev musl-dev
RUN apk add  jpeg-dev 
RUN apk add zlib-dev 
RUN apk add nodejs npm

RUN apk add gcc rust libffi-dev openssl-dev libressl-dev rust cargo

RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip3 install -r requirements.txt


COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

# copy project
COPY . /usr/src/app/

RUN dos2unix /usr/src/app/entrypoint.sh

RUN chmod +x ./entrypoint.sh

EXPOSE 8003

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD [ "bin/sh" ]