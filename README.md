# wbpk
![npm scoped](https://img.shields.io/badge/npm-1.0.0-orange.svg)

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
npm i -g wbpk
```
Head over to any directory with a fresh `npm init` and let the magic happen.

### Things to consider
- bundle.js is located in `http://localhost:8080/bundle.js` by the **publicPath** in **devServer**
    - switch the src of script in index.html to `build/bundle.js` if you want to switch to production mode
- **contentBase** is being served in root directory
    - if you want to server the html file elsewhere, just change the path in contentBase
- **proxy** is set to port 3000 if you are using a server to fetch data
- hot module replacement is enabled
- **historyApiFallback** is enabled so react will be able to maintain its page through reload
- minify and uglify of bundle.js is not yet implemented
- import your own css files or use styled components for now
___
### Future
- will change the structure of this webpack depending on the webpack versions in the future
- add options for more customization like creating server files if you are working with api's

