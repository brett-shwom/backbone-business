(function(Backbone) {

  Backbone.BusinessRuleProcessor = {};

  Backbone.BusinessRuleProcessor.processRule = function(rule) {

    if (typeof rule === 'string') { //allow for a rules with one clause to be strings
      rule = [rule];
    }

    if (typeof rule === 'boolean') {
      return rule;
    }
    else if (typeof rule === 'function') {
      return rule();
    }
    else if (Array.isArray(rule)) {
      
    }
    else {
      throw 'invalid type';
    }

  };


})(Backbone);

