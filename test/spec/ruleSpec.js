describe('a rule', function () {
  "use strict";

  var   rule
      , facts
      , Facts
  ;

  describe('that is an object', function () {

    beforeEach(function () {
      rule = {};
    });

    it('will cause an exception to be thrown', function() {
      spyOn(Backbone.BusinessRuleProcessor, 'processRule').andCallThrough();

      expect(function () {Backbone.BusinessRuleProcessor.processRule({rule:rule});}).toThrow();
    });

  });

  describe('that is a number', function () {

    beforeEach(function () {
      rule = 1;
    });

    it('will cause an exception to be thrown', function() {
      spyOn(Backbone.BusinessRuleProcessor, 'processRule').andCallThrough();

      expect(function () {Backbone.BusinessRuleProcessor.processRule({rule:rule});}).toThrow();
    });

  });

  describe('that is null', function () {

    beforeEach(function () {
      rule = null;
    });

    it('will cause an exception to be thrown', function() {
      spyOn(Backbone.BusinessRuleProcessor, 'processRule').andCallThrough();

      expect(function () {Backbone.BusinessRuleProcessor.processRule({rule:rule});}).toThrow();
    });

  });

  describe('that is undefined', function () {

    beforeEach(function () {
      rule = undefined;
    });

    it('will cause an exception to be thrown', function() {
      spyOn(Backbone.BusinessRuleProcessor, 'processRule').andCallThrough();

      expect(function () {Backbone.BusinessRuleProcessor.processRule({rule:rule});}).toThrow();
    });

  });

  describe('that is a string', function () {

    describe('and which evalues a true fact', function () {

      beforeEach(function () {
        rule = "facts.fact1";
        Facts = Backbone.Model.extend({});
        facts = new Facts({fact1:true});
      });

      it('will return true', function() {

        expect(Backbone.BusinessRuleProcessor.processRule({rule:rule, facts : facts})).toBe(true);
        
      });

    });

    describe('and which evalues a false fact', function () {

      beforeEach(function () {
        rule = "facts.fact1";
        Facts = Backbone.Model.extend({});
        facts = new Facts({fact1:false});
      });

      it('will return false', function() {

        expect(Backbone.BusinessRuleProcessor.processRule({rule:rule, facts : facts})).toBe(false);
        
      });

    });

  });

  describe('that is an array', function () {

    describe('that is empty', function () {

      beforeEach(function () {
        rule = [];
      });

      it('will cause an exception to be thrown', function() {

        spyOn(Backbone.BusinessRuleProcessor, 'processRule').andCallThrough();

        expect(function () {Backbone.BusinessRuleProcessor.processRule({rule:rule});}).toThrow();
  
      });

    });

    describe('that contains a non-string element', function () {

      beforeEach(function () {
        rule = [1];
      });

      it('will cause an exception to be thrown', function() {

        spyOn(Backbone.BusinessRuleProcessor, 'processRule').andCallThrough();

        expect(function () {Backbone.BusinessRuleProcessor.processRule({rule:rule});}).toThrow();
  
      });

    });


  });


});

describe('facts', function () {
  describe('when defined as an object', function () {

    beforeEach(function(){
      facts = {fact1: true};
    });

    it('should throw an exception when passed to Backbone.BusinessRuleProcessor._evaluateRuleString', function () {
      spyOn(Backbone.BusinessRuleProcessor,'_evaluateRuleString').andCallThrough();

      expect(function() {Backbone.BusinessRuleProcessor._evaluateRuleString({ruleString : '', facts : facts});}).toThrow('facts must be a backbone model');

    });
  });

  describe('when defined as a Backbone.Model instance', function () {

    beforeEach(function(){
      Facts = Backbone.Model.extend({});
      facts = new Facts({fact1: true});
    });

    it('should not throw an exception when passed to Backbone.BusinessRuleProcessor._evaluateRuleString', function () {
      spyOn(Backbone.BusinessRuleProcessor,'_evaluateRuleString').andCallThrough();

      expect(function() {Backbone.BusinessRuleProcessor._evaluateRuleString({ruleString : '', facts : facts});}).not.toThrow();

    });
  });
});