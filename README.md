# @bopeng95/wbpk
![npm scoped](https://img.shields.io/badge/npm-1.1.1-orange.svg)

### simple lightweight webpack + react starter

## Why
- too many unnecessary files with create-react-app
- no one really understands how to customize their own webpack config file to fit their needs
- this cli tool is simply a small template to start a simple react app (add components, routers, or more dependencies yourself if needed)

## Currently
- webpack@4
- for development only at the moment
- production script is made for you, but you still need to create a server file to run the project in production mode

## How to run program
```
npm i -g @bopeng95/wbpk
```
Head over to any directory with a fresh `npm init` and let the magic happen.

### Things to consider
- **contentBase** is being served in root directory
    - if you want to server the html file elsewhere, just change the path in contentBase
- **proxy** is set to port 3000 if you are using a server to fetch data
- react hot loader is enabled
- **historyApiFallback** is enabled so react will be able to maintain its page through reload
- import your own css files or use styled components for now
___
### Future
- will change the structure of this webpack depending on the webpack versions in the future
- add options for more customization like creating server files if you are working with api's

