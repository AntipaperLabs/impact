
# widgets implementation proposition

## Data Hooks

Imagine an example module code:

```javascript
// model

var Items = Collection('items');

// on server

Publish('listOfItems', function (options) {
  // TODO: check if options are correct,
  //       maybe skip item details
  return Items.find({}, options);
});

Publish('itemDetails', function (id) {
  return Items.find({_id:id});
});

// client: special code (loaded before the module itself)

DataSource('listOfItems', function (options) {
  this.subscribe('listOfItems', options, function () {
    this.ready(Items.find(options));
  });
});

DataSource('itemDetails', function (id) {
  this.subscribe('itemDetails', id, function () {
    this.ready(Items.findOne({_id:id}));
  });
});
```

The data sources can be used anywhere in the module code
```javascript
var handle = DataHandle('listOfItems', {
  limit: 16, skip: 0, page: 1,
});

handle.ready (function (data) {
  // this will be called each time the data is ready or modified ...
});
```

If we no longer need this data we can call
```javascript
handle.stop ()
```

The data sources can also be accessed from outside the module

```javascript
var handle = new Impact.DataHandle('myModule/listOfItems', {...});
```

The system will then attempt to load necessary source code (even if the module is not loaded yet).
To register callbacks you can use:

```javascript
handle.ready(function () { /* ... */ });
handle.ready(function () { /* ... */ });
```

In templates, one can use `dataHook` helper to render
a draggable hook representing particular piece of data

```html
{{dataHook listOfItems}}
```

## Widgets

```javascript
Impact.widgetTypes['blog/listOfPosts'] = new Impact.WidgetFactory('blog/listOfPosts', {
  // very similar to module factory
});
```

Possible implementation of `area` helper

```html
<template name="area">
  {{#each widgets}}
    {{showWidget}}
  {{/each}}
</template>
```

```javascript
Template.area.widgets = function () {
  return Widgets.find({
    view:this.viewName, // this should be current view identifier
    area:this.areaName,
  });
};
```

```javascript
Template.someLayout.area = function (name) {
  return new Handlebars.SafeString(Template.area({
    areaName:name,
    viewName:"",
  }));
};
```

```javascript
Handlebars.registerHelper('showWidget', function (config) {
  var handle = Impact.requireWidget(config);
  if (handle.status === 'loading') {
    // render spinning wheel
  } else if (handle.status === 'ok')
    return new Handlebars.SafeString(handle.widget.render());
  return ''; // render some error message
});
```

