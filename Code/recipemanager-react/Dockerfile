# pull the official base image
FROM node:alpine as base
# set working direction
WORKDIR /app

EXPOSE 3000

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# add app
COPY . ./
# start app
CMD ["npm", "start"]