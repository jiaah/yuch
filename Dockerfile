FROM node:10

ARG NODE_ENV=production

# Install PM2
RUN npm install -g pm2

# set workdir
RUN mkdir -p /app
WORKDIR /app

# RUN mkdir -p /app/public/dist
# RUN mkdir -p /app/server

# add package.json
COPY package.json /app

# install dependencies
RUN npm install --production

COPY bin /app
COPY public/dist /app
COPY server /app
COPY process.yml /app

# Expose port
EXPOSE 9080

# serve with pm2
CMD [ "pm2-docker", "process.yml" ]
