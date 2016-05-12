
var iir = iir || {};

iir.verbs = [
  'thinks that',
  'does conclude that',
  'has determined that',
  'is of the opinion that',
  'is sickened by you,',
  'is sickened by you, you racist you.$',
  'doesn\'t like you, racist.$',
  'believes that',
  'is aghast that you\'re even capable of typing something so racist;',
  'is absolutely disgusted,'
];

iir.descriptions = [
  '<i>EXTREMELY</i> racist!!',
  'moderately racist, for an 1800s plantation owner.',
  '100% racist.',
  'racist.  And also that your a idiot.',

  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>',
  '<span id="iir-res-pct"></span><script>iir.pct();</script>'
];

iir.query = function() {

  var toLoad = '#iir-container';
  $(toLoad).loading();
  $('#iir-response').hide();
  setInterval(function() {
    $(toLoad).loading('stop');
    $('#iir-response').show();
  }, 3000);

  var verb = util.randArrEntry(iir.verbs);
  var desc = util.randArrEntry(iir.descriptions);
  var predicate = verb + ' that is ' + desc;

  if(verb.substring(verb.length-1) === '$') {
    predicate = verb.substring(0, verb.length-1);
  }

  return 'The internet ' + predicate;
};

iir.generate = function() {
  var input = $('#iir-topic');
  var topic = input.val().trim();
  var query = '';

  if(input.val().toLowerCase().indexOf("posten") > -1) {
    query = iir.query(); // for loading screen
    query = 'The internet believes that that is 0% racist and <i>really</i> awesome to boot.';
  } else {
    query = iir.query();
  }

  $('#iir-response').html(query);
  input.val('');
  input.removeClass("valid");
  input.next().removeClass("active");
};

iir.pct = function() {
  var pct = Math.floor(Math.random() * 40 + 60);
  $('#iir-res-pct').text(pct + '% racist!!!');
};

