
Template.area.widgets = function () {
  return Widgets.find({
    view:this.viewName, // this should be current view identifier
    area:this.areaName,
  });
};
