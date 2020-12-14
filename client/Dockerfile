# pull official base image
FROM node:current-slim

# set working directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

# install app dependencies
RUN npm install --silent

# add app
COPY . ./

# Uses port which is used by the actual application
EXPOSE 3000

# start app
CMD ["npm", "start"]