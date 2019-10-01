FROM node:10-alpine

# env for nodejs
ENV NODE_ENV production

# Install PM2
RUN npm install -g pm2

# set workdir
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install --only=dev

# Bundle app source
COPY . .

# build frontend
RUN npm run predeploy

# Expose port
EXPOSE 9080

#HEALTHCHECK --interval=10s CMD wget -qO- localhost:9080

# serve with pm2
CMD [ "pm2-docker", "process.yml" ]
