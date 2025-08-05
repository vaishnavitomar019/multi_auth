# Backend Dockerfile (TypeScript version)

FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build TypeScript
RUN npm run build

# Expose API port
EXPOSE 5000

# Run compiled JS from dist/
CMD ["node", "dist/server.js"]  
