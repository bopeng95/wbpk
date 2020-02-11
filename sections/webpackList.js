const Listr = require('listr');
const fse = require('fs-extra');
const path = require('path');

const webpackFiles = require('../fileStrings/wbpkStr')
const { webCommon, webDevelopment, webProduction } = webpackFiles;

const webpackList = new Listr([
  {
    title: 'webpack common',
    task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.common.js'), webCommon),
  },
  {
    title: 'webpack dev',
    task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.dev.js'), webDevelopment),
  },
  {
    title: 'webpack prod',
    task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.prod.js'), webProduction),
  },
]);

module.exports = webpackList;
