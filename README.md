backbone-business
=================

Take the logic out of your views with business rules!

When the facts change, then your views get re-rendered.

purpose
-----------
To reduce to configuration all rules governing the visibility of views in a single-page-app.

usage
-----------

There are 4 main concepts:

facts
rules
rules.viewVisibility
the backbone-business mixin

###facts

`facts` is Backbone.Model whose attributes represent the state of the application. It might look something like:

```
{
  url_hash : '#/checkout',
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
  LoginView

}

```

rules is an object


developing backbone-business
-----------

###installation
```
bower install
```
