# Development stage
FROM node:20 AS development

WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Keep container running in dev mode
CMD ["npm", "run", "start:dev"]

# Production stage
FROM node:20 AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]