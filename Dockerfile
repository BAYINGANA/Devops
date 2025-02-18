# Stage 1: Build the frontend
FROM node:16-alpine AS frontend-build
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:16-alpine AS backend-build
WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend-build /usr/src/app/frontend/dist ./public

# Stage 3: Run the backend with Node.js
FROM node:16-alpine
WORKDIR /usr/src/app/backend

# Copy built backend from previous stage
COPY --from=backend-build /usr/src/app/backend . 

# Expose backend port
EXPOSE 3000

# Install dependencies (if not copied earlier)
RUN npm install --production

# Set environment variables (ensure you pass .env at runtime)
CMD ["node", "index.js"]
