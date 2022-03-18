FROM node:12.2

# Install dependencies
RUN apt-get update &&\
    apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
    xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps

# Cd into /app
WORKDIR /app

# Copy package.json into app folder
COPY package.json /app

# Install dependencies
RUN wget https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/microsoft-edge-stable_96.0.1054.62-1_amd64.deb 
RUN apt-get install -y ./microsoft-edge-stable_96.0.1054.62-1_amd64.deb 

RUN chmod -R o+rwx /usr/share/man/man1/microsoft-edge-stable.1.gz
RUN chmod -R o+rwx /usr/bin/microsoft-edge-stable
RUN npm install
COPY . /app

# Start server on port 3000∂
EXPOSE 8080:8080
ENV PORT=8080

# Creating Display
ENV DISPLAY :99

# Start script on Xvfb
CMD Xvfb :99 -screen 0 1024x768x24 & npm start