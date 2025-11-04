FROM node:20-alpine3.22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port and define startup command
EXPOSE 8888
CMD ["npm", "run", "start"]