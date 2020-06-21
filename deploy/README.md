# Run Services

## Setup Services using Docker Compose

From shell, do:

- Go to `deploy` directory `cd deploy`

Then you need to define these environment variables:

- Define path for database e.g. `data/database` using `mkdir -p ~/data/database` then `export MYSQL_DATABASE_DIRECTORY=~/data/database`
- Define path for dashboard e.g. `data/dashboard` using  `mkdir -p ~/data/dashboard` then `export DASHBOARD_DATA_DIRECTORY=~/data/dashboard`
- Define MYSQL root password `export MYSQL_ROOT_PASSWORD=[metabase-database-password]`
- Define Metabase password `export METABASE_DATABASE_PASSWORD=[metabase-database-password]`
- Define external hostname `export SERVICE_EXTERNAL_HOSTNAME=[hostname]` and protocol `export SERVICE_EXTERNAL_PROTOCOL=http/https`
- Define external Metabase URL `export DASHBOARD_METABASE_EXTERNAL_URL=[metabase-external-url]`, for example `export DASHBOARD_METABASE_EXTERNAL_URL=http://metabase.your-domain.com:8080`
- Define metabase API password `export DASHBOARD_METABASE_API_PASSWORD=[metabase-api-user-password]` the password should be minimum of 8 characters length, has 1 upper case, 1 lower case, and 1 number.

Another option is to append all of required environment variables into `.env` file

```shell
mkdir -p ~/data/database \
&& mkdir -p ~/data/dashboard \
&& echo '
MYSQL_DATABASE_DIRECTORY=~/data/database
MYSQL_ROOT_PASSWORD=P@ssw0rd1!
DASHBOARD_DATA_DIRECTORY=~/data/dashboard
METABASE_DATABASE_PASSWORD=P@ssw0rd1!
SERVICE_EXTERNAL_HOSTNAME=localhost
SERVICE_EXTERNAL_PROTOCOL=http
DASHBOARD_METABASE_API_PASSWORD=P@ssw0rd1!
DASHBOARD_METABASE_EXTERNAL_URL=http://localhost:8080' >> .env
```

- Build dashboard-app image using `docker-compose build`
- Run the service detached `docker-compose up -d`

## Configure Metabase

- Open Metabase in URL defined in `DASHBOARD_METABASE_EXTERNAL_URL`
- Metabase will prompt to create new admin account
- Using admin account, select Settings \ Admin \ People \ Add Someone. Then create new account for Dashboard API access using email defined in `DASHBOARD_METABASE_API_USERNAME`
- Login using the new account, select Settings \ Account Settings \ Password. Then change their password with password defined in `DASHBOARD_METABASE_API_PASSWORD`

## Miscellaneous

- Restart docker service

```shell
sudo systemctl restart docker.socket docker.service
```

- Migrate H2 to MySQL

```shell
docker run --rm --detach --network root_smc -v /home/dashboard/data/metabase-data:/metabase-data -e MB_DB_FILE=/metabase-data/metabase.db -e MB_DB_TYPE=mysql -e MB_DB_DBNAME=metabase -e MB_DB_PORT=3306 -e MB_DB_USER=metabase-user -e MB_DB_PASS=dodol-garut -e MB_DB_HOST=bi-database -e MB_ENCRYPTION_SECRET_KEY="7C0P/ippyQ+KTbCoMEZHcDgQSARHAhzv/6SxcTeUuKk=" -e MB_PASSWORD_COMPLEXITY=normal -e JAVA_TOOL_OPTIONS="-Xms256m -Xmx512m" --name metabase-test metabase/metabase load-from-h2
```
