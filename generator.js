#!/usr/bin/env node

var _ = require('lodash');
var vorpal = require('vorpal')();
var fs = require('fs');
var S = require('string');
var path = require('path');
var mkdirp = require('mkdirp');
var pkg = require(path.join(__dirname, 'package.json'));

//load config
var config = require(path.join(__dirname + '/generator.config.json'));

//get selected bundle data
var bundleIds = config.bundles.map(function(bundle) {
  return bundle.id;
});

var questions = [
  {
    type: "list",
    name: "bundle",
    message: "What template bundle do you wish to use? ",
    choices: bundleIds,
    filter: function(val) { return val.toLowerCase(); }
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of your component? ",
  }
];

vorpal.command('create', 'Create a new angular service or component.')
  .action(function(args, cb) {
    var self = this;

    // self.prompt({
    //   type: "confirm",
    //   name: "hasParent",
    //   message: "Will your generated content have a parent component? ",
    // }, function(answers) {
    //   if (answers.hasParent) {
    //     self.prompt({ type: "input", name: "parentName", message: "What is the name of the parent component? " }, function(x) {
    //       answers = _.assignIn(answers, x);
    //       self.prompt(questions, function(y) {
    //         answers = _.assignIn(answers, y);
    //         cb(undefined, answers);
    //       });
    //     });
    //   } else {
        self.prompt(questions, function(answers) {
          // answers = _.assignIn(answers, x);
          answers = _.assignIn(answers);
          cb(undefined, answers);
        });
    //   }
    // });

  });

vorpal
  .delimiter('$')
  .show()
  .parse(process.argv)
  .exec('create').then(function(data) {
    generateBundle(data);
  });

function generateBundle(data) {

  //figure out different casings templates could require
  var caseNames = {
    name: data.name,
    camelCaseName: S(data.name).camelize().s,
    captialCaseName: S(data.name).camelize().s.charAt(0).toUpperCase() + S(data.name).camelize().s.slice(1),
    lowerCaseName: S(data.name).camelize().s.charAt(0).toLowerCase() + S(data.name).camelize().s.slice(1),
    upperCaseName: S(data.name).camelize().s
  }

  //get selected bundle data
  var bundle = config.bundles.filter(function(bundle) {
    return bundle.id == data.bundle;
  });

  //if we found a bundle then process it
  if (bundle.length) {
    var b = bundle[0];

    var targetFolder = path.join(__dirname, b.outputFolder, "/", data.name)
    //check to make sure we are not overwriting an existing folder by mistake
    if (fs.existsSync(targetFolder)) {
      console.log(targetFolder + " already exists.  You need to delete it if you wish to create a folder with that path.");
      process.exit(0);
    } else {
      //make new folder for template output in app
      mkdirp(targetFolder, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('created', targetFolder);
        }
      });

      //figure out what the output file names should be
      var outputFileNames = b.files.map(function(file) {
        var fileName = path.join(__dirname, b.outputFolder, data.name, "/", data.name + file.slice(file.indexOf(".")));
        return fileName;
      });

      var dataProps = Object.getOwnPropertyNames(b.data);
      var parsedData = {};
      dataProps.forEach(function(prop, i) {
        if (prop != 'di') {
          var parsedProp = _.template(b.data[prop]);
          parsedData[prop] = parsedProp(caseNames)
        }
      });

      //auto generated vars for templates
      //get case names
      parsedData = _.extend(parsedData, caseNames);

      //massage DI data into proper usable syntaxs for templates
      var injectors = b.data.di.map(function(di) {
        return "'" + di + "'";
      });
      parsedData.injectors = injectors.toString();
      var params = b.data.di.map(function(di) {
        return "public " + di + ": any";
      });
      parsedData.params = params.toString()

      //load each template file and parse with lodash.template using config.data
      b.files.forEach(function(file, i) {
        var contents = fs.readFileSync(path.join(__dirname, b.templateFolder, file), 'utf8');
        var parsed = _.template(contents);
        fs.writeFileSync(outputFileNames[i], parsed(parsedData));
      });

      console.log(targetFolder + " created.");
      process.exit(0);
    }
  }
}

