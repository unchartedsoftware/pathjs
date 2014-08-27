var _ = require('./util');

var ID = 0;

var Node = function(attributes) {
  this.id = ID++;
  this.handlers = {};
  _.extend(this, attributes);
};

Node.prototype = {
  data: function(data) {
    if (arguments.length === 0) {
      return this._data;
    } else {
      this._data = data;
    }
  },

  attr: function(attributes) {
    _.extend(this, attributes);
    return this;
  },

  on: function(type, handler) {
    var handlers = this.handlers[type];
    if (!handlers) {
      handlers = this.handlers[type] = [];
    }
    handlers.push(handler);
  },

  off: function(type, handler) {
    if (!handler) {
      this.handlers[type] = [];
    } else {
      var handlers = this.handlers[type];
      var idx = handlers.indexOf(handler);
      if (idx >= 0) {
        handlers.splice(idx, 1);
      }
    }
  },

  trigger: function(type, event) {
    var handlers = this.handlers[type];
    if (handlers) {
      handlers.forEach(function(handler) {
        handler(event);
      });
      return true;
    }
    return false;
  },

  draw: function(ctx) {
  },

  pick: function(ctx, x, y, lx, ly) {
  }
}

module.exports = Node;