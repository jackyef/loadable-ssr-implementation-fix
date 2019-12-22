# Stage 1 - build express app
FROM node:11
# as bundle

LABEL maintainer="vashchukmaksim@gmail.com"

# nexus
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

# Sentry
ARG SENTRY_DSN
ENV SENTRY_DSN=$SENTRY_DSN

# Google Analytics
ARG GOOGLE_ANALYTICS_ID
ENV GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID

# Set registry
RUN rm -rf /root/.npmrc
RUN rm -rf ~/.npmrc
RUN touch ~/.npmrc
RUN echo "@tg:registry=https://nexus.tgpost.me/repository/npm-private/\n" >> ~/.npmrc
RUN echo "@scc:registry=https://nexus.tgpost.me/repository/npm-private/\n" >> ~/.npmrc
RUN echo "ca = null\n" >> ~/.npmrc
RUN echo "always-auth = true\n" >> ~/.npmrc
RUN echo "//nexus.tgpost.me/repository/npm-private/:_authToken=NpmToken.$NPM_TOKEN\n" >> ~/.npmrc

# Copy source
COPY . /usr/src
WORKDIR /usr/src

# Install dependencies
# RUN yarn

# Build express app
# RUN yarn prd:build-client
# RUN yarn prd:build-server

# Stage 2 - Forever
# FROM node:11

# Copy artifacts
# COPY --from=bundle /usr/src/bundle_client /usr/src/bundle_client
# COPY --from=bundle /usr/src/bundle_server /usr/src/bundle_server
# COPY --from=bundle /root/.npmrc /root/.npmrc
# COPY package.json yarn.lock* /usr/src/
# WORKDIR /usr/src

# Install
RUN yarn global add forever
RUN yarn install --production=true

# Expose port
EXPOSE 3000

# Run
CMD ["node", "bundle_server/server.js"]
