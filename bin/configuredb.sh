#!/bin/bash

database="yuchdb"

echo "Configuring database: $database"

dropdb -U postgres yuchdb
createdb -U postgres yuchdb

psql -U postgres yuchdb < ./bin/sql/yuch.sql

echo "$database configured"
