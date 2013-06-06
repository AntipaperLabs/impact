Impact = {};

Impact._proxy = function (func, obj, prefix) {
  return function () {
    var args = _.toArray(arguments);
    if (args.length > 0)
      args[0] = prefix + args[0];
    func.apply(obj, args);
  };
};
