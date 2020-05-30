#!/usr/bin/env bash

# Dev
yarn link @tg/configs

# Libs
yarn link @tg/utils
yarn link @tg/styled
yarn link @tg/form
yarn link @tg/modal
yarn link @tg/async
yarn link @tg/notify
yarn link @tg/api-proxy
yarn link @tg/api-proxy-data
yarn link @tg/api-proxy-upload

# Packages (app level)
yarn link @tg/elm
yarn link @tg/uploader

# Resources
yarn link @tg/resources

# API proxies
yarn link @tg/api-proxy-auth
yarn link @tg/api-proxy-drafts
yarn link @tg/api-proxy-bot

# TODO: Should not be needed (check treeshaking)
yarn link @tg/calendar
