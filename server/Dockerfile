# Use the official Node.js image
FROM node:22

# Create and set the app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
