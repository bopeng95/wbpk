const Listr = require('listr');
const fse = require('fs-extra');
const path = require('path');

const linting = require('../fileStrings/linting');
const { eslint, prettier, prettierIgnore } = linting;

const linterList = new Listr([
  {
    title: 'prettier',
    task: () => fse.outputFileSync(path.join(process.cwd(), '.prettierrc'), prettier)
  },
  {
    title: 'prettier ignore',
    task: () => fse.outputFileSync(path.join(process.cwd(), '.prettierignore'), prettierIgnore)
  },
  {
    title: 'eslint',
    task: () => fse.outputFileSync(path.join(process.cwd(), '.eslintrc.json'), eslint)
  },
]);

module.exports = linterList;
