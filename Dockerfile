FROM node:10.19.0-alpine

RUN mkdir -p /app
RUN mkdir -p /app/dist
#RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
#RUN npm install --quiet node-gyp -g

WORKDIR /app

ADD package*.json ./
ADD dist dist
ADD server.js .
RUN npm ci --production

CMD ls -l && npm run server

EXPOSE 4000

VOLUME [ "/app" ]
