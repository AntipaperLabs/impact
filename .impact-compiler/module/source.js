/*
  Class that holds and module source code
  and outputs it to a string
*/


var jsTemplate = require('./jstemplate');

var t = {
  client:             1,
  server:             2,
  clientAndServer:    3,
  dashboard:          4,
  clientTemplate:     5,
};

exports.type = t;

/*
  Module source code class
*/
var Source = function(name) {
  this.name               = name;
  this.templates          = '';
  this.clientConstructor  = '';
  this.serverConstructor  = '';
  this.manifest           = '{}';
  this.dashboard          = '';
};


$functions(Source, {

  /*
    
  */
  addCode: function(code, type) {
    switch(type) {
      case t.client:
        this.clientConstructor += code;
        break;
      case t.server:
        this.serverConstructor += code;
        break;
      case t.clientAndServer:
        this.clientConstructor += code;
        this.serverConstructor += code;
        break;  
      case t.dashboard:
        this.dashboard += code;
        break;
      case t.clientTemplate:
        this.templates += code;
        break;
    };
  },

  /*
    Outputs client code
  */
  clientOutput: function() {
    return jsTemplate.fillTemplate('client', this);
  },

  /*
    Outputs server code
  */
  serverOutput: function() {
    return jsTemplate.fillTemplate('server', this);
  },

});

exports.Source = Source;



