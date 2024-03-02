#!/bin/bash

# Env vars with secrets intentionally NOT being set. The goal of this script is
# to verify that all commands run succesfully and don't fail with node/npm
# mismatches. Once it works, this will be removed and the actual build on TC
# will take care of everything after we update it to use the new image with
# the right node version.

# Define the name of your base and test images
BASE_IMAGE_NAME="ci-e2e-gb-core-on-dotcom"
TEST_IMAGE_NAME="ci-e2e-gb-core-on-dotcom-tests"

# Define path to the base Dockerfile
BASE_DOCKERFILE_PATH="Dockerfile.base"

# Define path to the testing Dockerfile
TEST_DOCKERFILE_PATH="gb-core-e2e-on-dotcom-dockerfile.testing"

# Step 1: Build the base image locally
echo "Building the base image: $BASE_IMAGE_NAME..."
docker build -f $BASE_DOCKERFILE_PATH -t $BASE_IMAGE_NAME:latest .

# Check if the base image build was successful
if [ $? -ne 0 ]; then
    echo "Failed to build the base image. Exiting..."
    exit 1
fi

# Step 2: Build the testing image
echo "Building the testing Docker image: $TEST_IMAGE_NAME..."
docker build -f $TEST_DOCKERFILE_PATH -t $TEST_IMAGE_NAME:latest .

# Check if the test image build was successful
if [ $? -ne 0 ]; then
    echo "Failed to build the testing image. Exiting..."
    exit 1
fi

# Step 3: Run the testing image with WordPress environment variables
echo "Running tests in Docker container..."
docker run $TEST_IMAGE_NAME

echo "Tests completed."
