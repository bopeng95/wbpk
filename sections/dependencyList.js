const execa = require('execa');
const Listr = require('listr');

const install = (arr, options = {}) => {
  const { type = '-S', peerDeps } = options;
  const peers = peerDeps ? 'install-peerdeps' : 'i';
  const installType = [peers, type];
  return installType.concat(arr);
};

const dep = ['react', 'react-dom', 'sanitize.css', 'styled-components'];

const dev = ['webpack', 'webpack-dev-server', 'webpack-cli', 'babel-loader',
  '@babel/core', '@babel/preset-env', '@babel/preset-react', 'babel-eslint',
  'webpack-merge', 'clean-webpack-plugin'];

const loaders = ['css-loader', 'style-loader', 'image-webpack-loader',
  'file-loader', 'url-loader'];

const linters = ['eslint', 'prettier', 'eslint-config-prettier',
  'eslint-import-resolver-webpack', 'eslint-plugin-prettier'];

const testing = ['jest', 'enzyme', 'enzyme-adapter-react-16',
  '@testing-library/react', '@testing-library/react-hooks'];

const airbnb = ['eslint-config-airbnb'];

const dependencyList = new Listr([
  {
    title: 'installing dependencies',
    task: () => execa('npm', install(dep)),
  },
  {
    title: 'installing webpack dependencies',
    task: () => execa('npm', install(dev, { type: '-D' })),
  },
  {
    title: 'installing loaders',
    task: () => execa('npm', install(loaders, { type: '-D' })),
  },
  {
    title: 'installing linters',
    task: () => execa('npm', install(linters, { type: '-D' })),
  },
  {
    title: 'installing tests',
    task: () => execa('npm', install(testing, { type: '-D' })),
  },
  {
    title: 'installing airbnb eslint',
    task: () => execa('npx', install(airbnb, { type: '-D', peerDeps: true })),
  },
], { concurrently: true });

module.exports = dependencyList;
