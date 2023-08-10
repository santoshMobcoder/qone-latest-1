# Use a base image
FROM node:16.3.0-alpine

# Set the working directory
WORKDIR /app

# Copy files into the image
COPY . /app

RUN npm install

# Specify the command to run when the container starts
CMD ["ENV=dev", "npm", "start"]
