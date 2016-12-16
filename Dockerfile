FROM node:7

#Create App directory
RUN mkdir -p /usr/src/app
ADD yarn.tar.gz /usr/src/
RUN mv /usr/src/dist /usr/src/yarn
ENV PATH "$PATH:/usr/src/yarn/bin"
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN cd /usr/src/app && ln -s /tmp/node_modules

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
