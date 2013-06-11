


Path = {};

Path.stringToArray = function(string) {
  var array = string.split('/');
  if(array[0] === '') array.splice(0,1);
  var z = array.length - 1;
  if(array[z] === '') array.splice(z,1);
  return array;
};

Path.queryToDict = function(string) {
  return {data: string};
};


Path._dep = new Deps.Dependency();


Path.get = function() {
  Path._dep.depend();

  return {
    path: Path.stringToArray(window.location.pathname),
    dict: Path.queryToDict(window.location.search),
  };
};

Path.to = function(href) {
  history.pushState(null,null,href);
  Path._dep.changed();
};




/* 
  Parts extracted from page.js
*/

/*
  Event button.
*/

function which(e) {
  e = e || window.event;
  return null == e.which
    ? e.button
    : e.which;
};

/*
  Check if `href` is the same origin.
*/

function sameOrigin(href) {
  var origin = location.protocol + '//' + location.hostname;
  if (location.port) origin += ':' + location.port;
  return 0 == href.indexOf(origin);
};

Path.onclick = function(e) {

  // console.log("CLICK 000");

  if (1 != which(e)) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;

  // console.log("CLICK 100");

  // ensure link
  var el = e.target;
  while (el && 'A' != el.nodeName) el = el.parentNode;
  if (!el || 'A' != el.nodeName) return;

  // console.log("CLICK 200");

  // ensure non-hash
  var href = el.href;
  var path = el.pathname + el.search;
  if (el.hash || '#' == el.getAttribute('href')) return;


  // console.log("CLICK 300");


  // check target
  if (el.target) return;

  // console.log("CLICK 400");

  // x-origin
  if (!sameOrigin(href)) return;

  // console.log("CLICK 500");
  // TODO:
  // same page
  // var orig = path;
  // path = path.replace(base, '');
  // if (base && orig == path) return;

  e.preventDefault();

  // console.log("CLICK 600");
  Path.to(href);

  // console.log("CLICK -1");
};




