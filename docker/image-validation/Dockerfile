FROM node:4.3.1
MAINTAINER Olivier Liechti <olivier.liechti@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm init -y
RUN npm install --save net
RUN npm install --save async
RUN npm install --save chance
RUN npm install --save chai
RUN npm install --save dockerode

ENTRYPOINT ["node", "/opt/app/app.js"]
