
$(document).ready(function() {


});



function highlightSelectedNav(navItemId) {
    var id = '#' + navItemId;

    $(id).parent().find('div.active').removeClass('active');
    $(id).children().eq(0).addClass('active');
}
