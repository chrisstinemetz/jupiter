# specify the node base image with your desired version node:<version>
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set proxy http://one.proxy.att.com:8080 && \
    npm config set https-proxy http://one.proxy.att.com:8080 && \
    npm install

COPY . .

# replace this with your application's default port
EXPOSE 3000

CMD ["npm", "start"]