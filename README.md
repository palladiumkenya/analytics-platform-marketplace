# Plugin Service

This project is a Node.js-based service for managing file operations and integrations assocaiated with the analytics platform marketplace.

## Features
- File upload and management
- MinIO integration for object storage
- Configurable data sources
- RESTful API endpoints
- Environment-based configuration

## Getting Started

### Prerequisites
- Docker
- Docker Compose
- Node.js (if running locally)

### Setup
1. Clone the repository:
   ```zsh
   git clone <repo-url>
   cd plugin-service
   ```
2. Copy the example environment file and update as needed:
   ```zsh
   cp env.example .env
   # Edit .env with your settings
   ```
3. Build and start the service using Docker Compose:
   ```zsh
   ./install.sh
   ```
## Environment Variables
Refer to `env.example` for all configurable options.

## Scripts
- `install.sh`: Installs dependencies and runs services
- `stop.sh`: Stops the service

