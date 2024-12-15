FROM node:20 as build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build -- --configuration=production

# Debug: List contents of dist directory
RUN ls -la dist/

# Serve stage
FROM nginx:alpine

# Copy built assets from build stage
# We'll copy the entire dist directory first
COPY --from=build /usr/src/app/dist/Dteam/browser /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]