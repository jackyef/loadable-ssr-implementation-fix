#!/usr/bin/env bash

# Dev
yarn unlink @tg/configs

# Libs
yarn unlink @tg/utils
yarn unlink @tg/form
yarn unlink @tg/modal
yarn unlink @tg/async
yarn unlink @tg/notify
yarn unlink @tg/wrapper
yarn unlink @tg/exceptions
yarn unlink @tg/api-proxy
yarn unlink @tg/api-proxy-data

# Packages (app level)
yarn unlink @tg/elm

# Resources
yarn unlink @tg/resources

# API proxies
yarn unlink @tg/api-proxy-auth
yarn unlink @tg/api-proxy-drafts

# TODO: Should not be needed (check treeshaking)
yarn link @tg/calendar
