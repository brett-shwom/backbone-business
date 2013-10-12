(function (Backbone) {

  var evaluateBusinessRules = function() {
    return _businessRules._default;
  };

  Backbone.Business = function (options) {

    var ViewClass = options.viewClass;
    var businessRules = options.businessRules;

    _businessRules = businessRules;

    return {
      render : function () {

        if (evaluateBusinessRules()) {

          return ViewClass.prototype.render.apply(this, arguments);
        }
      },
      injectBuisnessRules : function(businessRules) {
        _businessRules = businessRules;
      }
    };
  };

})(Backbone);





