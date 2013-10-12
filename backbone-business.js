var businessRules = {
  _default : true



};




var evaluateBusinessRules = function() {


  return businessRules._default;


};





function (ViewClass) {
  Backbone.Business = {
    render : function () {
      if (evaluateBusinessRules()) {
        return ViewClass.prototype.render.apply(this, arguments);
      }
    }
  };
}