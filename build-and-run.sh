#!/bin/bash

# Stop the existing Docker container
docker stop word-cards

# Remove the existing Docker container
docker rm word-cards

# Rebuild the Docker image
docker build -t word-cards:latest .

# Run a new Docker container
docker run --name word-cards -d -p 8080:8080 word-cards:latest