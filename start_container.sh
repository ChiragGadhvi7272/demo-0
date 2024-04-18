#!/bin/bash

set -e

# Replace these values with your specific information
ECR_REGISTRY="118400147842.dkr.ecr.us-west-2.amazonaws.com"
DOCKER_IMAGE="118400147842.dkr.ecr.us-west-2.amazonaws.com/shipconsole-ui:latest"
CONTAINER_NAME="shipconsole-ui"
HOSTPORT="9000"
CONTAINERPORT="80"
HOST_ENTRY="scdocker.shipconsole.com:10.251.0.190"
LABEL_HOST_PATH="/u01/qzlabels"
LABEL_CONTAINER_PATH="/usr/share/nginx/html/u01/qzlabels"
ENVIRONMENT="production"

CONFIG_FILE="${CONFIG_FILE:-prod}"


# Log in to the ECR registry
echo "Logging in to ECR registry..."
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin $ECR_REGISTRY

# Pull the Docker image from ECR
echo "Pulling Docker image from ECR..."
docker pull $DOCKER_IMAGE

# Stop and remove any running containers with the same name
echo "Stopping and removing existing container..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Run the new Docker container with the updated image
echo "Starting the new Docker container..."
docker run --name $CONTAINER_NAME -d -p $HOSTPORT:$CONTAINERPORT -e CONFIG_FILE="$CONFIG_FILE" --add-host $HOST_ENTRY -v $LABEL_HOST_PATH:$LABEL_CONTAINER_PATH $DOCKER_IMAGE 

# Optional: Prune old Docker images to save space
echo "Pruning old Docker images..."
docker image prune -f

echo "Deployment completed successfully."