FROM node:8.10.0
EXPOSE 8888
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN npm init -y
RUN npm install
RUN npm install --save uuid
RUN npm install --save dgram
ENTRYPOINT ["node", "musician.js"]
CMD ["piano"]