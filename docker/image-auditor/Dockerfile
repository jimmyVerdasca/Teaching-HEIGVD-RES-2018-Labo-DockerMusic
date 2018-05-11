FROM node:8.10.0
EXPOSE 2205
COPY src /opt/app/
WORKDIR /opt/app/
RUN npm init -y
RUN npm install --save net
RUN npm install --save dgram
RUN npm install --save moment
ENTRYPOINT ["node", "/opt/app/auditor.js"]