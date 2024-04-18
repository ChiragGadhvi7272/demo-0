#!/bin/bash

set -e

# Define the name of your Docker container
CONTAINER_NAME="shipconsole-ui"

# Check if the Docker container is running
if [ "$(docker inspect -f '{{.State.Running}}' $CONTAINER_NAME 2>/dev/null)" = "true" ]; then
  # Gracefully stop the Docker container
  docker stop $CONTAINER_NAME
  echo "Docker container '$CONTAINER_NAME' stopped."
else
  echo "Docker container '$CONTAINER_NAME' is not running."
fi
