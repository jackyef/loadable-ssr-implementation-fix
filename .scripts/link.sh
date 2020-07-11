#!/usr/bin/env bash

# Dev
yarn link @prostpost/configs

# Libs
yarn link @prostpost/utils
yarn link @prostpost/styled
yarn link @prostpost/form
yarn link @prostpost/modal
yarn link @prostpost/async
yarn link @prostpost/notify
yarn link @prostpost/api-proxy
yarn link @prostpost/api-proxy-data
yarn link @prostpost/api-proxy-upload

# Packages (app level)
yarn link @prostpost/elm
yarn link @prostpost/uploader

# Resources
yarn link @prostpost/resources

# API proxies
yarn link @prostpost/api-proxy-auth
yarn link @prostpost/api-proxy-drafts
yarn link @prostpost/api-proxy-bot

# TODO: Should not be needed (check treeshaking)
yarn link @prostpost/calendar
