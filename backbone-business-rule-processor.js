(function(Backbone) {
  "use strict";

  Backbone.BusinessRuleProcessor = {};

  Backbone.BusinessRuleProcessor._evaluateRuleString = function(options) {

    if (!options.facts || !(options.facts instanceof Backbone.Model)) {
      throw 'facts must be a backbone model';
    }


    var facts = options.facts.attributes;
    var ruleString = options.ruleString;

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

        for (i=0;i<rule.length;i++) {
          if (typeof rule[i] !== 'string') {
            throw 'all rule elements must be strings';
          }
        }

        rulePartial = rule[0];
        partialResult = Backbone.BusinessRuleProcessor._evaluateRuleString({ruleString : rule[0], facts : facts});
        result = partialResult;

        for(i=1; i<rule.length;i++) {
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

