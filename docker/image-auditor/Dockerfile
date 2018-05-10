FROM node:8.10.0
EXPOSE 2205
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN npm init -y
RUN npm install --save net
RUN npm install --save dgram
RUN npm install --save moment
ENTRYPOINT ["node", "auditor.js"]