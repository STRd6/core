(function() {
  var Core, extend,
    __slice = [].slice;

  Core = function(I, self) {
    if (I == null) {
      I = {};
    }
    if (self == null) {
      self = {};
    }
    extend(self, {
      I: I,
      attrAccessor: function() {
        var attrNames;
        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        attrNames.forEach(function(attrName) {
          return self[attrName] = function(newValue) {
            if (arguments.length > 0) {
              I[attrName] = newValue;
              return self;
            } else {
              return I[attrName];
            }
          };
        });
        return self;
      },
      attrReader: function() {
        var attrNames;
        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        attrNames.forEach(function(attrName) {
          return self[attrName] = function() {
            return I[attrName];
          };
        });
        return self;
      },
      extend: function(object) {
        return extend(self, object);
      },
      include: function() {
        var Module, modules, _i, _len;
        modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          Module = modules[_i];
          Module(I, self);
        }
        return self;
      }
    });
    return self;
  };

  extend = function() {
    var name, source, sources, target, _i, _len;
    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      for (name in source) {
        target[name] = source[name];
      }
    }
    return target;
  };

  module.exports = Core;

}).call(this);

//# sourceURL=core.coffee