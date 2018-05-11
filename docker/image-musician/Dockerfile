FROM node:8.10.0
COPY src /opt/app/
WORKDIR /opt/app/
RUN npm init -y
RUN npm install --save uuid
RUN npm install --save dgram
ENTRYPOINT ["node", "/opt/app/musician.js"]
CMD ["piano"]