FROM node:10

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
WORKDIR /usr/src/server-a
COPY ./ .

#Expose application port
EXPOSE 8080

#Run application
CMD [ "npm", "start" ]