# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy your Node.js application files to the container
COPY package.json package-lock.json /app/

# Install Node.js application dependencies
RUN npm install

# Copy the rest of your application files to the container
COPY . /app

# Expose the port your application listens on (change 3000 to your app's port)
EXPOSE 5000

# Start your Node.js application
CMD ["node", "app.js"]
