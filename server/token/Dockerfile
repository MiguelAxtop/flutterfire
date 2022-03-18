FROM node:12.2

# Cd into /app
WORKDIR /app

# Copy package.json into app folder
COPY package.json /app

# Install dependencies
RUN npm install 
COPY . /app

# Start server on port 3000∂
EXPOSE 8080:8080
ENV PORT=8080

# Start script on Xvfb
CMD  npm start