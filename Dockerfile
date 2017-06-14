FROM node:8-slim

MAINTAINER EdLab <edlabit@tc.columbia.edu>

ENV TZ 'America/New_York'
RUN /bin/bash -c 'unlink /etc/localtime; \
ln -s /usr/share/zoneinfo/America/New_York /etc/localtime'

COPY . /prj

WORKDIR /prj

RUN yarn --ignore-optional

EXPOSE 3000
EXPOSE 3001
ENV NODE_ENV production

CMD npm run app
