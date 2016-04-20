
$(document).ready(function() {

});


function highlightSelectedNav(navItemId) {
  var id = '#' + navItemId;

  $(id).parent().find('a.active').removeClass('active');
  $(id).children().eq(0).addClass('active');
}


function addPagerClickListeners() {

  $('.pager .next').on('click', function() {
    adjustPageIndex(true, 'blog');
  });

  $('.pager .prev').on('click', function() {
    adjustPageIndex(false, 'blog');
  })

}

function adjustPageIndex(increment, pageName) {
  var path = window.location.href;
  var sections = path.split('/');

  var id = sections.pop();
  var page = sections.pop();
  var intId = parseInt(id) || 0;

  if(page === pageName && intId > 0) {
    var newUrl = "";
    for(var i=0; i<sections.length; ++i) {
      newUrl += sections[i] + "/";
    }

    newUrl += pageName + '/';
    intId += (increment) ? 1 : -1;
    newUrl += intId.toString();

    window.location.href = newUrl;
  }
}
