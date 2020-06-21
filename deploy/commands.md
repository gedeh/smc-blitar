# Run dashboard services

## Run services

From shell, do:

- Go to `deploy` directory `cd deploy`
- Define path for database e.g. `data/database` using `mkdir -p ~/data/database` then `export MYSQL_DATABASE_DIRECTORY=~/data/database`
- Define path for dashboard e.g. `data/dashboard` using  `mkdir -p ~/data/dashboard` then `export DASHBOARD_DATA_DIRECTORY=~/data/dashboard`
- Declare MYSQL root password `export MYSQL_ROOT_PASSWORD=[metabase-database-password]`
- Declare Metabase password `export METABASE_DATABASE_PASSWORD=[metabase-database-password]`
- Declare external hostname `export SERVICE_EXTERNAL_HOSTNAME=[hostname]` and protocol `export SERVICE_EXTERNAL_PROTOCOL=http/https`
- Run the service as compose `docker-compose up -d`

## Miscellaneous

### Restart docker service

```shell
sudo systemctl restart docker.socket docker.service
```

### Migrate H2 to MySQL

```shell
docker run --rm --detach --network root_smc -v /home/dashboard/data/metabase-data:/metabase-data -e MB_DB_FILE=/metabase-data/metabase.db -e MB_DB_TYPE=mysql -e MB_DB_DBNAME=metabase -e MB_DB_PORT=3306 -e MB_DB_USER=metabase-user -e MB_DB_PASS=dodol-garut -e MB_DB_HOST=bi-database -e MB_ENCRYPTION_SECRET_KEY="7C0P/ippyQ+KTbCoMEZHcDgQSARHAhzv/6SxcTeUuKk=" -e MB_PASSWORD_COMPLEXITY=normal -e JAVA_TOOL_OPTIONS="-Xms256m -Xmx512m" --name metabase-test metabase/metabase load-from-h2
```
