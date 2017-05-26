FROM node:6-slim

MAINTAINER EdLab <edlabit@tc.columbia.edu>
RUN npm install pm2 -g

ENV TZ 'America/New_York'
RUN /bin/bash -c 'unlink /etc/localtime; \
ln -s /usr/share/zoneinfo/America/New_York /etc/localtime'

RUN apt-get -y update

COPY . /prj

WORKDIR /prj

RUN /bin/bash -c "npm install yarn -g && yarn --ignore-optional"

EXPOSE 3000
EXPOSE 3001

CMD npm run app
