FROM node:8

ARG NODE_ENV=production

# Install PM2
RUN npm install -g pm2

RUN apt-get update

# set workdir
RUN mkdir -p /app
WORKDIR /app

RUN mkdir -p /app/image
RUN mkdir -p /app/volumes

# add package.json
COPY package.json /app

# install dependencies
RUN npm install --production

# add source code
COPY server /app
COPY process.yml /app

# Expose port
EXPOSE 3000

# serve with pm2
CMD [ "pm2-docker", "process.yml" ]
