FROM node:10

ARG NODE_ENV=production

# Install PM2
RUN npm install -g pm2

# set workdir
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# build frontend
RUN npm run predeploy

# Expose port
EXPOSE 9080

HEALTHCHECK --interval=10s CMD wget -qO- localhost:9080

# serve with pm2
CMD [ "pm2-docker", "process.yml" ]
