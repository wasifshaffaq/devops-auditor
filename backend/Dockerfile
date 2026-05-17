# --- Stage 1: Get Trivy Binary ---
FROM aquasec/trivy:0.51.1 AS trivy-provider

# --- Stage 2: Application Runtime ---
FROM node:20.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy Trivy binary from the provider stage
COPY --from=trivy-provider /usr/local/bin/trivy /usr/local/bin/trivy

# Create application directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Set environment defaults
ENV PORT=5001
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
