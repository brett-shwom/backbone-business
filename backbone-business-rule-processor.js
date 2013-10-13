(function(Backbone) {

  Backbone.BusinessRuleProcessor = {};

  Backbone.BusinessRuleProcessor._evaluateRuleString = function(options) {

    var facts = options.facts;
    var ruleString = options.ruleString;
    console.warn(ruleString, facts, eval(ruleString))
    //TODO: could be made more robust
    return eval(ruleString);
  };

  Backbone.BusinessRuleProcessor.processRule = function(options) {

    var rule = options.rule;
    var facts = options.facts;

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
      if (rule.length === 0) {
        throw 'rule cannot be an empty array';
      }

      return (function () {
        //right now the idea is that all of the array parameters should be strings and that we are AND'ing them
        //TODO: add more flexibility to this (ex: other boolean logic (OR, NOT))
        var i,rulePartial,partialResult,result;

        rulePartial = rule[0];
        partialResult = Backbone.BusinessRuleProcessor._evaluateRuleString({ruleString : rule[0], facts : facts});
        result = partialResult;

        for(i=1; i<rule;i++) {
          rulePartial=rule[i];
          partialResult = Backbone.BusinessRuleProcessor._evaluateRuleString({ruleString : rulePartial, facts : facts});
          result = result && partialResult; //TODO: AND is currently the only way rule partials are combined
        }

        return result;

      })();
    }
    else {
      throw 'invalid type';
    }

  };


})(Backbone);

