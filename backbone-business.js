(function (Backbone) {
  "use strict";

  var _businessRules;

  var evaluateViewVisibility = function(options) {

    var view = options.view;
    var facts = options.facts;

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
      return Backbone.BusinessRuleProcessor.processRule({rule:rule, facts : facts});
    }

    
  };



  Backbone.Business = function (options) {

    var ViewClass = options.viewClass;
    var businessRules = options.businessRules;
    var facts = options.facts; //TODO: im not sure that facts should be passed in here. need to make sure that they can change, be added to etc.

    _businessRules = businessRules;

    return {
      //TODO: constructor vs. initialize?
      constructor : function () {

        if (!facts || !(facts instanceof Backbone.Model)) {
          throw 'facts must be a backbone model';
        }
        //this.listenTo(facts,'change', function(){console.error('change')});


        this.listenTo(facts,'change', (function() { return this.render.apply(this, arguments)}).bind(this) ); //rerender when the facts model changes
                                                    //TODO: totally needs to be optimized, but not so bad for now
                                                    //wrapped in a function to make it easier to spyOn this.render
        ViewClass.prototype.constructor.apply(this, arguments);
      },
      render : function () {
        if (evaluateViewVisibility({view : this,facts : facts})) {
          return ViewClass.prototype.render.apply(this, arguments);
        }
        else {
          this.$el.empty(); //TODO: pretty crude, but gets the job done for now
        }
      },
      injectBuisnessRules : function(businessRules) {
        _businessRules = businessRules;
      }
    };
  };

})(Backbone);





