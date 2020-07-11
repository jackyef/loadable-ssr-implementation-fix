#!/usr/bin/env bash

# Dev
yarn unlink @prostpost/configs

# Libs
yarn unlink @prostpost/utils
yarn unlink @prostpost/styled
yarn unlink @prostpost/form
yarn unlink @prostpost/modal
yarn unlink @prostpost/async
yarn unlink @prostpost/notify
yarn unlink @prostpost/exceptions
yarn unlink @prostpost/api-proxy
yarn unlink @prostpost/api-proxy-data

# Packages (app level)
yarn unlink @prostpost/elm
yarn link @prostpost/uploader

# Resources
yarn unlink @prostpost/resources

# API proxies
yarn unlink @prostpost/api-proxy-auth
yarn unlink @prostpost/api-proxy-drafts
yarn link @prostpost/api-proxy-bot

# TODO: Should not be needed (check treeshaking)
yarn link @prostpost/calendar
