# --- Stage 1: Build & Runtime ---
FROM node:20-slim

# Install system dependencies and Trivy
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin v0.51.1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create application directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Set environment defaults (can be overridden)
ENV PORT=5001
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
