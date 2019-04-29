FROM node:10

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
WORKDIR /usr/src/frontend
COPY package*.json ./

RUN npm install

COPY ./env.sh ./
COPY .env ./
RUN ./env.sh

# Bundle app source

COPY ./ .

#Expose application port
EXPOSE 3000

#Run application
CMD [ "npm", "start"]