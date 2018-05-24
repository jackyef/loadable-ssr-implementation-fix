# Stage 1 - build express app
FROM node:9.11.1 as bundle

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

# Clone repo
RUN git clone git@bitbucket.org:sccockpit/ui-kit.git

# Install dependencies
RUN yarn install

# RUN npm install --only=dev
# RUN npm install --only=prod

# Add repo to node_modules
RUN mkdir -p ./node_modules/@scc
RUN mv ./ui-kit ./node_modules/@scc/scc-ui-kit

# Build express app
RUN yarn run prd:build-client
RUN yarn run prd:build-server

# RUN npm run prd:build-client
# RUN npm run prd:build-server

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

# RUN npm install -g forever
# RUN npm install --only=prod

CMD ["forever", "bundle_server/server.js"]
