(function (Backbone) {


  var evaluateViewVisibility = function(view) {

    var   ViewClassName
        , ViewClass
        , _default
        , rule
    ;

    //TODO: do I even need the ViewClass? What am I doing with it?

    //TODO: super inefficient search
    //search doesn't need to be called every time we call evaluateViewVisibility
    //eval might be slow
    //linear search might be slow
    for (ViewClassName in _businessRules.viewVisibility) {
      if (ViewClassName === '_default') { 
        //do nothing
        //_default is the only non-viewClass name allowed
      }
      else {
        ViewClass = eval(ViewClassName);
        if (view.constructor === ViewClass) {
          rule = _businessRules.viewVisibility[ViewClassName];
          break;
        }

      }
    }

    if (ViewClass === undefined) {
      return _businessRules.viewVisibility._default;
    }
    else {
      return Backbone.BusinessRuleProcessor.processRule({rule:rule});
    }

    
  };



  Backbone.Business = function (options) {

    var ViewClass = options.viewClass;
    var businessRules = options.businessRules;

    _businessRules = businessRules;

    return {
      render : function () {
        if (evaluateViewVisibility(this)) {
          return ViewClass.prototype.render.apply(this, arguments);
        }
      },
      injectBuisnessRules : function(businessRules) {
        _businessRules = businessRules;
      }
    };
  };

})(Backbone);





