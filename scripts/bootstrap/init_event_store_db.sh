#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE "event-store";
	GRANT ALL PRIVILEGES ON DATABASE "event-store" TO "$POSTGRES_USER";
EOSQL