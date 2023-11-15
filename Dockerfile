# Specify the base image
FROM node:14

# Create app directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# App binds to port 3001 
EXPOSE 3001

# Define the command to run your app
CMD [ "node", "server.js" ]
