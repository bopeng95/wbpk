# @bopeng95/wbpk
![npm scoped](https://img.shields.io/badge/npm-2.0.0-orange.svg)

### simple lightweight webpack + react starter

## Why
- too many unnecessary files with create-react-app
- no one really understands how to customize their own webpack config file to fit their needs
- this cli tool is simply a small template to start a simple react app (add components, routers, or more dependencies yourself if needed)

## How to run program
```
npm i -g @bopeng95/wbpk
```
- Head over to any directory with a fresh `npm init` or `npm init -y`.
- Then run `wbpk`.

### Things to consider
- **contentBase** is being served in root directory
    - if you want to server the html file elsewhere, just change the path in contentBase
- **proxy** is set to port 3000 if you are using a server to fetch data
- hot module replacement is enabled
- styling is used in `styled-components`
- you can add your own fonts into a font folder from [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)
___
### Future
- will change the structure of this webpack depending on the webpack versions in the future
