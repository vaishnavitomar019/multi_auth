# Build stage
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

# Serve the app using Nginx
FROM nginx:alpine

# Copy built app to Nginx folder
COPY --from=build /app/dist/client/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf  

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
