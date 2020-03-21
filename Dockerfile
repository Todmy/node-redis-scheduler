FROM node:13

ADD ./ /app
WORKDIR /app

RUN npm install --no-progress --silent

CMD node app.js