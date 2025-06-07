#!/bin/bash

# Check if the container exists
if [ "$(docker ps -aq -f name=verde-flow-db)" ]; then
    # Check if the container is running
    if [ "$(docker ps -q -f name=verde-flow-db)" ]; then
        echo "Container is already running."
    else
        echo "Starting existing container."
        docker start verde-flow-db
    fi
else
    echo "Creating and starting new container."
    docker run --name verde-flow-db -e POSTGRES_DB=verde-flow-dev -e POSTGRES_USER=dev -e POSTGRES_PASSWORD=dev -p 8773:5432 -d postgres
fi

function pg_isready {
    echo "Checking if PostgreSQL is ready..."
    until docker exec verde-flow-db pg_isready -U dev -d verde-flow-dev; do
      echo "Waiting for PostgreSQL to be ready..."
      sleep 1
    done
}

pg_isready

# echo "Running migrations..."
# npm run migrate

echo "Database setup complete."
