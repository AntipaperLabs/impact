
Template.iDashboardPanel.helpers({
  places: function () {
    var places = [];
    Impact.Dashboard.places.forEach(function (name) {
      places.push({
        name: name.capitalize(),
        href: '/-' + name,
      })
    });
    return places;
  },
});
