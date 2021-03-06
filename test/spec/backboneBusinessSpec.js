describe('A View class', function () {
  "use strict";

  var   View
      , ViewWithBusiness
      , viewWithBusiness
      , Facts
      , facts
  ;

  describe('which extends Backbone.View', function () {

    beforeEach(function () {
      View = Backbone.View.extend({});
    });

    describe('and mixes in Backbone.Buisness with Backbone.View.extend', function () {

      describe('with a facts parameter that is not a Backbone.Model', function () {
        beforeEach(function () {
          ViewWithBusiness = View.extend(Backbone.Business({viewClass : View, businessRules : {}, facts : {fact1:true}})); //buisness rules are empty - later on we'll inject them
        });

        it('should result in an exception when that view is instantiated', function () {
          spyOn(ViewWithBusiness, 'constructor').andCallThrough();
          expect(function() {new ViewWithBusiness}).toThrow();
        });

      });

      describe('with a facts parameter that is a Backbone.Model', function () {
        beforeEach(function () {
          Facts = Backbone.Model.extend({});
          facts = new Facts({fact1:true});
          ViewWithBusiness = View.extend(Backbone.Business({viewClass : View, businessRules : {}, facts : facts})); //buisness rules are empty - later on we'll inject them
        });

        it('should not result in an exception when that view is instantiated', function () {
          spyOn(ViewWithBusiness, 'constructor').andCallThrough();
          expect(function() {new ViewWithBusiness}).not.toThrow();
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

            it('should re-render when the facts model changes', function () {
              runs(function () {
                spyOn(viewWithBusiness,'render');
                facts.trigger('change');
              });

              waits(50); //is 50ms too short?

              runs(function () {
                expect(viewWithBusiness.render).toHaveBeenCalled();
              });

            });

            describe('should have a render()', function () {
              it("that does not call the View class' prototype.render()", function () {

                spyOn(View.prototype, 'render');

                viewWithBusiness.render();

                expect(View.prototype.render).not.toHaveBeenCalled();


              });

              it("that empties the view's $el", function () {
                spyOn(viewWithBusiness.$el, 'empty');

                viewWithBusiness.render();

                expect(viewWithBusiness.$el.empty).toHaveBeenCalled();
              });

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

            it('should re-render when the facts model changes', function () {
              runs(function () {
                spyOn(viewWithBusiness,'render');
                facts.trigger('change');
              });

              waits(50); //is 50ms too short?

              runs(function () {
                expect(viewWithBusiness.render).toHaveBeenCalled();
              });

            });


            it("should have a render() that calls the View class' prototype.render()", function () {

              spyOn(View.prototype, 'render');

              viewWithBusiness.render();

              expect(View.prototype.render).toHaveBeenCalled();


            });
          });

          // describe('and whose underlying buisness rules contain a viewVisiblity:{_default:false} and a view class name {viewVisibility:{_default: true}} rule', function () {
            
          //   beforeEach(function () {
          //     viewWithBusiness.injectBuisnessRules({
          //       viewVisibility : {
          //         View : ['facts.fact1'],
          //         _default : false
          //       }
          //     });
          //   });


          //   it("should have a render() that calls the View class' prototype.render()", function () {

          //     spyOn(View.prototype, 'render');

          //     viewWithBusiness.render();

          //     expect(View.prototype.render).toHaveBeenCalled();


          //   });
          // });

        });


      });


    });


  });
});