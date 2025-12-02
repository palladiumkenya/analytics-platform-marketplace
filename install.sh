#!/bin/bash

echo "Building analytics platfrom marketplace stack"
docker compose build
echo "🚀 Starting analytics platform marketplace stack"
docker compose up -d