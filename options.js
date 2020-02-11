const chalk = require('chalk');
const readPkg = require('read-pkg');
const jsonfile = require('jsonfile');
const path = require('path');
const { log } = console;

const dependencyList = require('./sections/dependencyList');
const webpackList = require('./sections/webpackList');
const linterList = require('./sections/linterList');
const fileTreeList = require('./sections/fileTreeList');

const test = 'jest --verbose --passWithNoTests';
const development = 'webpack-dev-server --env.NODE_ENV=development --config webpack.dev.js --open';
const production = 'webpack --env.NODE_ENV=production --config webpack.prod.js';

const errorMsgs = [
  `package.json can't have other dependencies`,
  // `No package.json in current working directory. please npm init first.`,
  // `Syntax error in package.json`,
];

const completed = `
Completed installation

Run ${chalk.bold.cyan('npm run dev')} to start development!
`;

module.exports = {
  end: (ctx) => {
    if(!ctx.test) return log(`\nIncomplete\n`);
    log(completed);
  },
  tasks: [
    {
      title: 'checking for a valid package.json',
      task: ctx => {
        try {
          ctx.test = true;
          ctx.file = readPkg.sync();
          const hasDependencies = !!(ctx.file.dependencies || ctx.file.devDependencies);
          if (hasDependencies) throw new Error(errorMsgs[0]);
        } catch(err) { 
          // const token = err.message.substring(0, 16);
          // const syntax = token === 'Unexpected token' ? errorMsgs[2] : errorMsgs[1];
          // const error = err.message === errorMsgs[0] ? errorMsgs[0] : syntax;
          throw new Error(err.message);
        }
      },
    },
    {
      title: 'modifying package scripts',
      enabled: ctx => ctx.test,
      task: ctx => {
        ctx.file.scripts.test = test;
        ctx.file.scripts.dev = development;
        ctx.file.scripts.build = production;
        jsonfile.writeFileSync(path.join(process.cwd(), 'package.json'), ctx.file, { spaces: 2 });
      }
    },
    {
      title: 'installing dev and local dependencies',
      enabled: ctx => ctx.test,
      task: () => dependencyList,
    },
    {
      title: 'constructing webpacks',
      enabled: ctx => ctx.test,
      task: () => webpackList,
    },
    {
      title: 'constructing linting',
      enabled: ctx => ctx.test,
      task: () => linterList,
    },
    {
      title: 'constructing file structure',
      enabled: ctx => ctx.test,
      task: () => fileTreeList,
    }
  ],
};
