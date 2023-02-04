Pace Single Signon

Go to the root of Project. Make sure docker-compose.yml is on the root.

Commnad to start up the project: docker-compose [options] up

Above command will do following in the background:

1) Create the docker images for the services in the docker-compose.yml file

2) Create the pace database (PostgreSql 12)

3) Create the migration and migrate the database

4) Run the services on the ports exposed in the docker-compose file