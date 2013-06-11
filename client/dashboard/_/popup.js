

Impact.Dashboard.popup = function(html) {
  // console.log("POPUP!");
  var div = document.createElement('div');
  div.setAttribute('class', 'dashboard-popup-overlay');
  $(div).html(html);
  // console.log(div);
  $(div).css({display: 'none'});
  $(div).click(function(e){
    if(e.target === div)
    $(div).fadeOut(300, function(){
      $(div).remove();
    });
  });
  $('.dashboard-body').append(div);
  $(div).fadeIn(300);

};

