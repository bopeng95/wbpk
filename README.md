# @bopeng95/wbpk

![npm scoped](https://img.shields.io/badge/npm-2.1.0-orange.svg)

simple lightweight webpack + react starter

## Why

- too many unnecessary files with create-react-app
- no one really understands how to customize their own webpack config file to fit their needs
- this cli tool is simply a small template to start a simple react app (add components, routers, or more dependencies yourself if needed)

## How to run program

```javascript
npm i -g @bopeng95/wbpk
```

- Head over to any directory with a fresh `npm init` or `npm init -y`.
- Then run `wbpk`.

## What this package contains

- linting in this app is my preferences, change as you like
- has `jest`, `enzyme`, and `@testing/library` for react and react-hooks installed
- images (png/jpeg/gif) and svgs can be imported
- **proxy** is set to port 3000 if you are using a server to fetch data
- **hot module replacement** is enabled
- styling is used by `styled-components`
- you can add your own fonts into a fonts folder from [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) or just script it from google fonts website
