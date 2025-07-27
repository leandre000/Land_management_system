# Development stage
FROM node:20 AS development

WORKDIR /app

# Install system dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libgconf-2-4 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    lsb-release \
    xdg-utils \
    libnspr4 \
    libxss1 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

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