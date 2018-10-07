# Stage 1 - build express app
FROM node:9.11.1 as bundle

MAINTAINER Vashchuk Maksim "vashchukmaksim@gmail.com"

RUN apt-get update -y
RUN apt-get install apt-transport-https -y

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install yarn -y

# Install git
RUN apt-get install -y git

# Provide SSH key
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan -T 60 bitbucket.org >> /root/.ssh/known_hosts

# Copy source
COPY . /usr/src
WORKDIR /usr/src

# Clone repos (ui-kit and @tg/ui)
RUN git clone git@bitbucket.org:sccockpit/ui-kit.git
RUN git clone git@bitbucket.org:souldevsteam/tg-ui.git

# Install dependencies
RUN yarn install

# Add repos to node_modules
RUN mkdir -p ./node_modules/@scc
RUN mv ./ui-kit ./node_modules/@scc/ui-kit

RUN mkdir -p ./node_modules/@tg
RUN mv ./tg-ui ./node_modules/@tg/ui

# Build express app
RUN yarn prd:build-client
RUN yarn prd:build-server

# Stage 2 - Upload clinet bundle to GCS
FROM google/cloud-sdk:latest

COPY --from=bundle /usr/src/bundle_client /usr/src/bundle_client
COPY --from=bundle /usr/src/gcloud-service-key.json /usr/gcloud-service-key.json

ARG COMMIT_REF

RUN apt-get install -qq -y gettext
RUN gcloud auth activate-service-account --key-file=/usr/gcloud-service-key.json &&\
	gsutil -m cp -r /usr/src/bundle_client gs://tg-static-bucket/static/public-${COMMIT_REF} &&\
	gsutil -m mv -r gs://tg-static-bucket/static/public gs://tg-static-bucket/static/public-before-${COMMIT_REF} &&\
	gsutil -m mv -r gs://tg-static-bucket/static/public-${COMMIT_REF} gs://tg-static-bucket/static/public &&\
	gsutil acl ch -r -u AllUsers:R gs://tg-static-bucket/static

# Stage 2 - Forever
FROM node:9.11.1

# Copy artifacts
COPY --from=bundle /usr/src/bundle_server /usr/src/bundle_server
COPY --from=bundle /usr/src/bundle_client /usr/src/bundle_client

# Copy package.json
COPY package.json yarn.lock* /usr/src/

WORKDIR /usr/src

RUN yarn global add forever
RUN yarn install --production=true

CMD ["forever", "bundle_server/server.js"]
