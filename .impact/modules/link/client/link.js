
Template.showLink.helpers({
  href: function () {
    return this.data.get('href');
  },
  name: function () {
    return this.name || this.data.get('name');
  },
});
