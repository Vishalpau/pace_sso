#!/bin/sh

# echo "Statrted the process"

# if [ "$DATABASE" = "postgres" ]
# then
#     echo "Waiting for postgres..."

#     while ! nc -z $SQL_HOST $SQL_PORT; do
#       sleep 0.1
#     done

#     echo "PostgreSQL started again"
# fi

# python manage.py flush --no-input
# pip3 install -r requirements.txt
python manage.py migrate
 
#installing the dependencies
npm install 
 
#Running a build
npm run build


echo "Running server"  

python manage.py runserver 0.0.0.0:8003

exec "$@"
