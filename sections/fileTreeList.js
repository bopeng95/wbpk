const execa = require('execa');
const Listr = require('listr');
const fse = require('fs-extra');
const path = require('path');

const starters = require('../fileStrings/starters');
const { indexHTML, indexJS, appJS } = starters;

const settings = require('../fileStrings/settings');
const { globalStyles, gitignore } = settings;

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
    task: () => fse.outputFileSync(path.join(process.cwd(), '.gitignore'), gitignore),
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
    task: () => fse.outputFileSync(path.join(process.cwd(), 'src/containers/App/index.js'), appJS),
  },
]);

module.exports = fileTreeList;
