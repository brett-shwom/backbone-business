backbone-business
=================

Take the logic out of your views with business rules!

When the facts change, then your views get re-rendered.

purpose
-----------
To reduce to configuration rules governing the visibility of views in a single-page-app.

use cases
-----------
-managing the rules affecting the viewability of form elements in a report builder
-your application has a lot of complex business rules and you'd like to manage them all in one place

usage
-----------

There are 4 main concepts:

-facts
-rules
-rules.viewVisibility
-the backbone-business mixin

###facts

`facts` is Backbone.Model whose attributes represent the state of the application. It might look something like:

```
{
  url_hash : '#checkout',
  username : 'brett',
  isSuperUser : true,
  status : 'active',
  ...
}
```

###rules

`rules` is an object which currently supports a single key: `viewVisibility`

###rules.viewVisibility

`rules.viewVisibility` is an object whose keys are Backbone.View class names and whose values are strings which represent the rules governing the visibility of instances of that particular view class. The strings contain valid javscript which 
-references the facts object
-can be eval()'ed to a truthy or falsy value

```
rules.viewVisibility = {
  LoginView : "facts.username",
  CheckoutView : "facts.url_hash == '#checkout'"
}

```

###the backbone-business mixin

Backbone.Business gets mixed into your views as follows:

```
LoginView = Backbone.Marionette.ItemView.extend({
  template : '#login-view-template'
});

LoginView = LoginView.extend(Backbone.Business({viewClass : LoginView, businessRules : rules, facts : facts}));
```


developing backbone-business
-----------

###installation
```
bower install
```
