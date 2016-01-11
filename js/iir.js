
var iir = iir || {};

iir.verbs = [
  'thinks',
  'does conclude',
  'has determined',
  'is sickened by you,',
  'is sickened by you, you racist you.$',
  'believes',
  'is of the opinion',
  'is aghast that you\'re even capable of typing something so racist;',
  'is absolutely disgusted by your existence,',
  'doesn\'t like you, racist.$'
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
];

iir.query = function() {

  $('body').loading();
  setInterval(function() {
    $('body').loading('stop');
  }, util.randInt(5000));

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

  if(!topic) {
    query = '<b><i>Please enter a topic to search!</i></b>';
  } else {
    query = iir.query();
  }

  $('#iir-response').html(query);
  input.val('');
};

iir.pct = function() {
  var pct = Math.floor(Math.random() * 40 + 60);
  $('#iir-res-pct').text(pct + '% racist!!!');
}

