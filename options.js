const execa = require('execa');
const Listr = require('listr');
const chalk = require('chalk');
const readPkg = require('read-pkg');
const jsonfile = require('jsonfile');
const fse = require('fs-extra');
const webpackStr = require('./fileStrings/wbpkStr');
const indexHTML = require('./fileStrings/indexHTML');
const indexJS = require('./fileStrings/indexJS');
const path = require('path');
const log = console.log;

const dep = ['i', '-S', 'react', 'react-dom'];
const dev = ['i', '-D', 'webpack', 'webpack-dev-server', 'webpack-cli', 'babel-loader', '@babel/core', 
            '@babel/preset-env', '@babel/preset-react', 'css-loader', 'style-loader'];
const development = 'webpack-dev-server --env.NODE_ENV=development --open';
const production = 'webpack --env.NODE_ENV=production';

module.exports = {
    end: (ctx) => {
        if(ctx.test === false) return;
        log(chalk.green(`Completed installation`));
        log(chalk.cyan(`run 'npm run dev' to start development!\n`));
    },
    tasks: [
        {
            title: 'checking if package.json exists',
            task: (ctx, task) => {
                try { ctx.test = true; readPkg.sync(); }
                catch(err) { ctx.test = false; task.skip(chalk.red('no package.json in current working directory. please npm init first.')); }
            }
        },
        {
            title: 'installing dev and local dependencies',
            enabled: ctx => ctx.test === true,
            task: () => {
                return new Listr([
                    {
                        title: 'installing dependencies',
                        task: () => execa('npm', dep)
                    },
                    {
                        title: 'installing devdependencies',
                        task: () => execa('npm', dev)
                    }
                ], { concurrently: true });
            }
        },
        {
            title: 'modifying package scripts',
            enabled: ctx => ctx.test === true,
            task: () => {
                const file = readPkg.sync();
                file.scripts.dev = development;
                file.scripts.build = production;
                jsonfile.writeFileSync(path.join(process.cwd(), 'package.json'), file, { spaces: 2 });
            }
        },
        {
            title: 'constructing webpack.config.js',
            enabled: ctx => ctx.test === true,
            task: () => fse.outputFileSync(path.join(process.cwd(), 'webpack.config.js'), webpackStr)
        },
        {
            title: 'constructing index files',
            enabled: ctx => ctx.test === true,
            task: () => {
                return new Listr([
                    {
                        title: 'creating index.js into src directory',
                        task: (ctx, task) => {
                            execa('mkdir', ['src']).then(() => fse.outputFileSync(path.join(process.cwd(), 'src', 'index.js'), indexJS))
                            .catch(() => {
                                ctx.test = false;
                                task.skip('unable to make src directory.');
                            })
                        }
                    },
                    {
                        title: 'creating index.html to current directory',
                        task: () => fse.outputFile(path.join(process.cwd(), 'index.html'), indexHTML)
                    },
                    {
                        title: `creating a 'components' folder inside src`,
                        task: (ctx) => execa('mkdir', ['src/components'])
                                    .catch(() => {
                                        ctx.test = false;
                                        task.skip('unable to make ./src/components directory');
                                    })
                    }
                ]);
            }
        }
    ]
}