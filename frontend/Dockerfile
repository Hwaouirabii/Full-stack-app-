# Stage 1: Build the Angular app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the app using a simple HTTP server
FROM node:18
WORKDIR /app
COPY --from=build /app/dist/frontend /app
RUN npm install -g http-server
EXPOSE 4000
CMD ["http-server", "-p", "4000"]