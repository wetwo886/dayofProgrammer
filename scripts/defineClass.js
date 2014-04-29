
"use strict"
define(function () {
  return function defineClass(options, parentClass) {
    if (!options) {
      throw 'no sub class';
    }
    var toString = Object.toString;
    var Base = function () { }
    var notOverrides = ['options', 'base'];

    var copyProp = function (source, target) {
      for (var key in source) {
        if ((source.hasOwnProperty(key) || source.isPrototypeOf(key)) && isCanOverride(key)) {
          target.prototype[key] = source[key];
        }
      }
      return target;
    }

    var isCanOverride = function (prop) {
      for (var key in notOverrides) {
        if (key === prop) {
          return false;
        }
      }
      return true;
    }

    var sub_class = function (options) {
      if (options) {
        for (var key in options) {
          if (isCanOverride(key)) {
            this[key] = options[key];
          }
        }
      }

      if ('ctor' in this) {
        this['ctor'].call(this);
      }

      this.options = options;
      this.ctored = true;
    };

    if (parentClass) {
      //toString.call(parentClass) === '[object Array]' is error :Function.prototype.toString is not generic 
      if (parentClass instanceof Array) {
        for (var i = 0, len = parentClass.length; i < len; i++) {
          if (i === 0) {
            if (!(parentClass[i] instanceof Function)) {
              throw new Error('super class must be Function');
            }
            sub_class.prototype = new parentClass[i]();
            Base.prototype = new parentClass[i]();
          }
          else {
            copyProp(parentClass[i], sub_class);
            copyProp(parentClass[i], Base);
          }
        }
      }
      else {
        sub_class.prototype = new parentClass();
        Base.prototype = new parentClass();
      }

    }


    sub_class.prototype['base'] = new Base();
    copyProp(options, sub_class);
    return sub_class;
  }
});