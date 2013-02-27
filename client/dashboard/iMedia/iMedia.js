var Dup = function() {};
$functions(Dup, {
  find: function(keys) {
    console.log("******* DUP FIND");
    for(var i in keys) {console.log("["+i+"] => ["+keys[i]+"]");}
    console.log("***///* DUP FIND");
  },
});

Dup = new Dup();


Template.iMedia.rendered = function(){_.defer(function(){
  
  var $global = {'Dup': Dup};

  (function(classname){
    
      var Dup = function(){};
      $functions(Dup, {
        find: function() {
          var args = arguments;
          if(args[0] !== undefined) {
            args[0].classname = classname;
          } else {
            args[0] = {classname: classname};
          };
          return $global.Dup.find.apply(this, args);
        },
      
      });
      Dup = new Dup();

      Dup.find({kolor: 'kaszanki'});
    

  }) ('arbuz');
  

});};