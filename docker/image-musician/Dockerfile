FROM node:8.10.0
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN npm init -y
RUN npm install --save uuid
RUN npm install --save dgram
ENTRYPOINT ["node", "musician.js"]
CMD ["piano"]