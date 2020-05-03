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
yarn link @tg/uploader

# Resources
yarn unlink @tg/resources

# API proxies
yarn unlink @tg/api-proxy-auth
yarn unlink @tg/api-proxy-drafts
yarn link @tg/api-proxy-bot

# TODO: Should not be needed (check treeshaking)
yarn link @tg/calendar
