# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the NestJS port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
