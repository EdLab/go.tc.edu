FROM node:10-slim

LABEL maintainer="EdLab <edlabit@tc.columbia.edu>"

ARG TARGET

ENV TZ 'America/New_York'
RUN /bin/bash -c 'unlink /etc/localtime; \
ln -s /usr/share/zoneinfo/America/New_York /etc/localtime'
ENV NODE_ENV production

ENV APP=$TARGET

COPY . /prj

WORKDIR /prj

RUN npm i --ignore-optional

EXPOSE 3000
EXPOSE 3001

CMD npm start
