#!/bin/bash

echo "Starting SynergeReader..."
echo

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed or not in PATH."
    echo "Please install Docker and try again."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "ERROR: Docker is not running."
    echo "Please start Docker and try again."
    exit 1
fi

echo "Docker is available. Starting SynergeReader with Docker Compose..."
echo

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Start the application
docker-compose up --build

echo
echo "SynergeReader is starting up..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:5000"
echo
echo "Press Ctrl+C to stop the application."
