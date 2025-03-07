FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with legacy-peer-deps flag to bypass dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose port for Next.js dev server
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Start development server
CMD ["npm", "run", "dev"]