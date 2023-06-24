'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const assignIn = require('lodash/assignIn');
const path = require('path');

assignIn(Generator.prototype, require('yeoman-generator/lib/actions/install'));

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // This makes `appname` a required argument.
    // this.argument("appname", { type: String, required: true });

    // And you can then access it later; e.g.
    // this.log(this.options.appname);

    // This method adds support for a `--coffee` flag
    // this.option('coffee');

    // And you can then access it later; e.g.
    // this.scriptSuffix = this.options.coffee ? ".coffee" : ".js";
  }

  initializing() {
    this.props = {};
  }

  async prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('React.js') + ' generator!'
    ));

    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter your project name",
        default: path.basename(this.destinationPath()),
        // default: this.appname
      },
    ]);
  }

  // configuring() {
  //
  // }

  writing() {
    this.fs.copy(this.templatePath('**/!(_)*'), this.destinationRoot(), { globOptions: { dot: true } });
  }

  install() {
    this.npmInstall();
  }

  end() {
    this.log(yosay('Done. To run a project use ' + chalk.blue('npm install / npm start')));
  }
};
