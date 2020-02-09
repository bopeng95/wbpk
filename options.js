const execa = require('execa');
const Listr = require('listr');
const chalk = require('chalk');
const readPkg = require('read-pkg');
const jsonfile = require('jsonfile');
const fse = require('fs-extra');
const path = require('path');

const webpack = require('./fileStrings/wbpkStr')
const { webCommon, webDevelopment, webProduction } = webpack;

const linting = require('./fileStrings/linting');
const { eslint, prettier, prettierIgnore } = linting;

const globalStyles = require('./fileStrings/globalStyles');

const indexHTML = require('./fileStrings/indexHTML');
const indexJS = require('./fileStrings/indexJS');
const appJSX = require('./fileStrings/appJSX');
const ignore = require('./fileStrings/ignore');

const { log } = console;

const dep = ['i', '-S', 'react', 'react-dom', 'sanitize.css', 'styled-components'];

const dev = ['i', '-D', 'webpack', 'webpack-dev-server', 'webpack-cli', 'babel-loader', '@babel/core', 
            '@babel/preset-env', '@babel/preset-react', 'babel-eslint', 'webpack-merge', 'clean-webpack-plugin'];

const loaders = ['i', '-D', 'css-loader', 'style-loader', 'image-webpack-loader', 'file-loader', 'url-loader'];

const linters = ['i', '-D', 'eslint', 'prettier', 'eslint-config-prettier', 'eslint-import-resolver-webpack', 'eslint-plugin-prettier'];

const airbnb = ['install-peerdeps', '-D', 'eslint-config-airbnb'];

const development = 'webpack-dev-server --env.NODE_ENV=development --config webpack.dev.js --open';
const production = 'webpack --env.NODE_ENV=production --config webpack.prod.js';

const dependencyList = new Listr([
  {
    title: 'installing dependencies',
    task: () => execa('npm', dep),
  },
  {
    title: 'installing webpack dependencies',
    task: () => execa('npm', dev),
  },
  {
    title: 'installing loaders',
    task: () => execa('npm', loaders),
  },
  {
    title: 'installing linters',
    task: () => execa('npm', linters),
  },
  {
    title: 'installing airbnb eslint',
    task: () => execa('npx', airbnb),
  },
], { concurrently: true });

const webpackList = new Listr([
  {
    title: 'webpack common',
    enabled: ctx => ctx.test === true,
    task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.common.js'), webCommon),
  },
  {
    title: 'webpack dev',
    enabled: ctx => ctx.test === true,
    task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.dev.js'), webDevelopment),
  },
  {
    title: 'webpack prod',
    enabled: ctx => ctx.test === true,
    task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.prod.js'), webProduction),
  },
]);

const linterList = new Listr([
  {
    title: 'prettier',
    enabled: ctx => ctx.test === true,
    task: () => fse.outputFileSync(path.join(process.cwd(), '.prettierrc'), prettier)
  },
  {
    title: 'prettier ignore',
    enabled: ctx => ctx.test === true,
    task: () => fse.outputFileSync(path.join(process.cwd(), '.prettierignore'), prettierIgnore)
  },
  {
    title: 'eslint',
    enabled: ctx => ctx.test === true,
    task: () => fse.outputFileSync(path.join(process.cwd(), '.eslintrc.json'), eslint)
  },
]);

const fileTreeList = new Listr([
  {
    title: 'creating index.js into src directory',
    task: () => fse.outputFileSync(path.join(process.cwd(), 'src/index.js'), indexJS),
  },
  {
    title: 'creating index.html to current directory',
    task: () => fse.outputFile(path.join(process.cwd(), 'index.html'), indexHTML),
  },
  {
    title: 'adding .gitignore file',
    task: () => fse.outputFileSync(path.join(process.cwd(), '.gitignore'), ignore),
  },
  {
    title: `creating 'components' folder inside src`,
    task: () => execa('mkdir', ['src/components']),
  },
  // {
  //   title: `creating 'fonts' folder`,
  //   task: () => execa('mkdir', ['fonts']),
  // },
  {
    title: `adding globalstyles`,
    task: () => fse.outputFileSync(path.join(process.cwd(), 'src/global-styles.js'), globalStyles),
  },
  {
    title: `creating a 'containers' folder inside src and adding App`,
    task: () => fse.outputFileSync(path.join(process.cwd(), 'src/containers/App/index.js'), appJSX),
  },
]);

module.exports = {
  end: (ctx) => {
    if(ctx.test === false) return log(`\nIncomplete\n`);
    log(`\nCompleted installation`);
    log(`run ${chalk.bold.cyan('npm run dev')} to start development!\n`);
  },
  tasks: [
    {
      title: 'checking if package.json exists',
      task: (ctx, task) => {
        try { ctx.test = true; ctx.file = readPkg.sync(); }
        catch(err) { 
          ctx.test = false; 
          task.skip('No package.json in current working directory. please npm init first.'); 
        }
      },
    },
    {
      title: 'modifying package scripts',
      enabled: ctx => ctx.test === true,
      task: (ctx) => {
        ctx.file.scripts.dev = development;
        ctx.file.scripts.build = production;
        jsonfile.writeFileSync(path.join(process.cwd(), 'package.json'), ctx.file, { spaces: 2 });
      }
    },
    {
      title: 'installing dev and local dependencies',
      enabled: ctx => ctx.test === true,
      task: (ctx, task) => {
        if(ctx.file.dependencies && ctx.file.devDependencies) {
          ctx.test = false;
          task.skip('package.json cannot have any kind of dependencies.')
        } else return dependencyList;
      }
    },
    {
      title: 'constructing webpacks',
      enabled: ctx => ctx.test === true,
      task: () => webpackList,
    },
    {
      title: 'constructing linting',
      enabled: ctx => ctx.test === true,
      task: () => linterList,
    },
    {
      title: 'constructing file structure',
      enabled: ctx => ctx.test === true,
      task: () => fileTreeList,
    }
  ],
};
