describe('a rule', function () {
  "use strict";

  var   rule
      , facts
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
        facts = {fact1:true};
      });

      it('will return true', function() {

        expect(Backbone.BusinessRuleProcessor.processRule({rule:rule, facts : facts})).toBe(true);
        
      });

    });

    describe('and which evalues a false fact', function () {

      beforeEach(function () {
        rule = "facts.fact1";
        facts = {fact1:false};
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