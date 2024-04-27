FROM node:19-alpine3.15
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD [ "yarn", "run", "start" ]
