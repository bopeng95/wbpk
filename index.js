#!/usr/bin/env node
const Listr = require('listr');
const chalk = require('chalk');
const log = console.log;
const { tasks, end } = require('./options');

const list = new Listr(tasks);
list.run().then(end).catch(err => { 
    log(chalk.red(err.message)); 
    process.exit(1);
});