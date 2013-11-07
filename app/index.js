'use strict';
var util = require('util');
var path = require('path');
var generator = require('abc-generator');
var fs = require('fs');
var _ = require('lodash');

module.exports = Gallery;

function Gallery(args, options, config) {
    generator.UIBase.apply(this, arguments);
    this.version = args[0] || '1.0.0';
    this.cwd = options.env.cwd;

    this.on('end', function() {
        this.installDependencies();
        console.log('组件目录和文件创建完毕！');
    });
}

util.inherits(Gallery, generator.UIBase);

var proto = Gallery.prototype;

proto.askFor = function() {
  this.generatorName = 'Qiwoo';
  this.abcLogo =
    '   _____ ___________________  \n' +
    '  /  _  \\\\______   \\_   ___ \\ \n' +
    ' /  /_\\  \\|    |  _/    \\  \\/ \n' +
    '/    |    |    |   \\     \\____\n' +
    '\\____|__  |______  /\\______  /\n' +
    '        \\/       \\/        \\/ \n';
    if (this.generatorName) {

      this.abcLogo += '\n';

      var headingLen = Math.floor( (28 - this.generatorName.length) / 2);
      var tailLen = 28 - headingLen - this.generatorName.length;
      var name = '';

      _.times(headingLen, function() {
        name += '❯';
      });

      name += ' ' + this.generatorName.toUpperCase() + ' ';

      _.times(tailLen, function() {
        name += '❮';
      });

      this.abcLogo += name + '\n';
    }
    // 打印logo
    
    // this.abcLogo = 'Qiwoo';
    console.log(this.abcLogo);

};

proto.askAuthor = function() {
    var cb = this.async();

    var author = {
        name: 'qiwoo-team',
        email: 'qiwoo-team@gmail.com',
        proname: 'qiwoo-module',
        prodesc: 'qiwoo-description'
    };

    if (this.abcJSON && this.abcJSON.author) {
        var abcAuthor = this.abcJSON.author
        author.name = abcAuthor.name || 'qiwoo-team';
        author.email = abcAuthor.email || 'qiwoo-team@gmail.com';
    }
    console.log('请填入维护者名称，公司邮箱地址，项目名称(如detector)');
    var prompts = [{
        name: 'author',
        message: '维护者姓名:',
        default: author.name
    }, {
        name: 'email',
        message: '维护者邮箱:',
        default: author.email
    }, {
        name: 'proname',
        message: '项目名称',
        default: author.proname
    }, {
        name: 'prodesc',
        message: '项目描述',
        default: author.prodesc
    }];

    this.prompt(prompts, function(props) {
        this.author = props.author;
        this.email = props.email;
        this.proname = props.proname;
        this.prodesc = props.prodesc;
        cb();
    }.bind(this));
};

proto.copyFile = function() {
    // this.template('abc.json', 'abc.json');
    this.template('_package.json', 'package.json');
    this.template('README.md', 'README.md');
};

proto.mk = function() {
    var version = this.version;
    this.mkdir(version);
    var folds = ['docs', 'examples'];
    for (var i = 0; i < folds.length; i++ ) {
        this.mkdir(path.join(version, folds[i]));
    }
};

proto.createVersion = function() {
  var version = this.version;
  this.template('index.html', path.join(version, 'examples', 'index.html'));
};