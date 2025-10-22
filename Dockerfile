# ---- Base Stage ----
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
