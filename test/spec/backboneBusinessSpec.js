describe('A View class', function () {

  var   View
      , ViewWithBusiness
      , viewWithBusiness
  ;

  describe('which extends Backbone.View', function () {

    beforeEach(function () {
      View = Backbone.View.extend({});
    });

    describe('and mixes in Backbone.Buisness with Backbone.View.extend', function () {

      beforeEach(function () {
        ViewWithBusiness = View.extend(Backbone.Business({viewClass : View, businessRules : {}})); //buisness rules are empty - later on we'll inject them
      });

      describe('an instance created from that View class', function () {

        beforeEach(function () {
          viewWithBusiness = new ViewWithBusiness();
        });

        describe('and whose underlying buisness rules contain a single {viewVisibility:{_default: false}} rule', function () {

          beforeEach(function () {
            viewWithBusiness.injectBuisnessRules({
              viewVisibility : {
                _default : false    
              }
            });
          });

          it("should have a render() that does not call the View class' prototype.render()", function () {

            spyOn(View.prototype, 'render');

            viewWithBusiness.render();

            expect(View.prototype.render).not.toHaveBeenCalled();


          });
        });

        describe('and whose underlying buisness rules contain a single {viewVisibility:{_default: true}} rule', function () {
          
          beforeEach(function () {
            viewWithBusiness.injectBuisnessRules({
              viewVisibility : {
                _default : true
              }
            });
          });


          it("should have a render() that calls the View class' prototype.render()", function () {

            spyOn(View.prototype, 'render');

            viewWithBusiness.render();

            expect(View.prototype.render).toHaveBeenCalled();


          });
        });

        describe('and whose underlying buisness rules contain a viewVisiblity:{_default:false} and a view class name {viewVisibility:{_default: true}} rule', function () {
          
          beforeEach(function () {
            viewWithBusiness.injectBuisnessRules({
              viewVisibility : {
                View : ['facts.fact1'],
                _default : false
              }
            });
          });


          it("should have a render() that calls the View class' prototype.render()", function () {

            spyOn(View.prototype, 'render');

            viewWithBusiness.render();

            expect(View.prototype.render).toHaveBeenCalled();


          });
        });

      });

    });

  });
});