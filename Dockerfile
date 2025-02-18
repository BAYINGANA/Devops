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

# Stage 3: Serve the application
FROM nginx:alpine
COPY --from=backend-build /usr/src/app/backend /usr/src/app/backend
COPY --from=frontend-build /usr/src/app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Stage 3: Final image for running the backend server
FROM node:16-alpine
WORKDIR /usr/src/app/backend
COPY --from=backend-build /usr/src/app/backend .
EXPOSE 3000
CMD ["node", "server.js"]
