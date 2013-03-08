////////////////////
/**/(function(){/**/
////////////////////

Impact.Yield.matchRoute = function(routes) {
  var self = this;


  for(var key in routes) {
    // console.log("MROUTER test key:", key);
    // if(!Impact.mrouter.match(array, key)) continue;
    var value = map[key];
    // console.log("MROUTER match found!", value);
    if(typeof value == "string") return value;
    // if(typeof value == "function") return value.apply(this, array);
    continue;
  }

  return undefined;
};


////////////////////
/*********/})();/**/
////////////////////
