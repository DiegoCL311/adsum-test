# Use an official Node.js runtime as a parent image
FROM node:18-bullseye AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN ng build

# Stage 2: Serve the Angular app with a lightweight HTTP server
FROM nginx:alpine

# Copy the built app from the build stage to the NGINX directory
COPY --from=build /usr/src/app/dist/quiz /usr/share/nginx/html

# Expose the port your app runs on (NGINX default is 80)
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
