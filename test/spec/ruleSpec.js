describe('a rule', function () {

  var rule;

  describe('that is an object', function () {

    beforeEach(function () {
      rule = {};
    });

    it('will throw an exception', function() {
      spyOn(Backbone.BusinessRuleProcessor, 'processRule');

      Backbone.BusinessRuleProcessor.processRule(rule);

      expect(Backbone.BusinessRuleProcessor.processRule).toThrow();
    });

  });


});