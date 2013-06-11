

Impact.Dashboard.popupDismiss = function(popup) {
  popup.fadeOut(300, function(){
    popup.remove();
  });
};


Impact.Dashboard.popup = function(template, data) {
  


  var frag = Meteor.render(function() {
    return '<div>' + Template[template](data) + '</div>';
  });


  var dDiv = document.createElement('div');
  var d$Div = $(dDiv);
  d$Div.addClass('dashboard-popup-overlay');
  d$Div.append(frag);
  d$Div.hide();
  d$Div.click(function(e) {
    if(e.target === dDiv)
      Impact.Dashboard.popupDismiss(d$Div);
  });


  $('.dashboard-body').append(dDiv);
  d$Div.fadeIn(300);
  return d$Div;


  // var div = frag.firstChild;
  // var $div = $(div);

  // $div.hide();
  // $div.click(function(e){
  //   if(e.target === div)
  //   Impact.Dashboard.popupDismiss($div);
  // });
  // $('.dashboard-body').append(frag);
  // $div.fadeIn(300);

  // return $div;
};



Impact.Dashboard.popupGrowl = function(popup, messages) {

  var frag = Meteor.render(function() {
    var str = '<div class="dashboard-popup-growl">'
    messages.each(function(message){
      str += '<div>' + message + '</div>';
    });
    str += '</div>';
    return str;
  });


  var p = popup.find('.dashboard-popup');
  var footer = p.find('.dashboard-popup-footer');
  footer.before(frag);
};