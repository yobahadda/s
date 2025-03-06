#let's define the base image
FROM node:14.17.0-alpine3.13

# Set the working directory 
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application npm run dev 
CMD ["npm", "run", "dev"]

