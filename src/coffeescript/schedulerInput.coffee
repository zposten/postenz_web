class SchedulerInput
  timePickerOptions = {darktheme: true, autoclose: true, afterDone: () =>
    $.each($('div.input-field'), (index, value) =>
      picker = $(value).children('.timepicker').first()
      $(value).children('label').addClass('active') if picker.val()?
    )
  }

  constructor: ->
    @addSessionListener()
    @addSectionListener()
    @addCourseListener()
    @addMakeSchedulesListener()

  @init: ->
    new SchedulerInput()

  addSessionListener: ->
    @createAddClickListener('.schd-add-time', '.schd-session', 'time')
    @createRemoveClickListener('.schd-rmv-time', '.schd-section', '.schd-session')

  addSectionListener: ->
    @createAddClickListener('.schd-add-section', '.schd-section', 'section')
    @createRemoveClickListener('.schd-rmv-section', '.schd-course', '.schd-section')

  addCourseListener: ->
    @createAddClickListener('.schd-add-course', '.schd-course', 'course')
    @createRemoveClickListener('.schd-rmv-course', '#schd-courses', '.schd-course')
    $('[id^=course1-section1-time1-]').pickatime(timePickerOptions)

  createAddClickListener: (btnSelector, cloneSelector, inputID) ->
    $('#schd-courses').on 'click', btnSelector, (event) =>
      target = $(event.currentTarget)

      toClone = target.closest(cloneSelector)
      theClone = toClone.clone()
      
      timepickers = theClone.find('.input-field > input.timepicker')
      for picker in timepickers
        $(picker).pickatime(timePickerOptions)

      groups = [
        {tag: 'input', attr: 'id'},
        {tag: 'label', attr: 'for'}
      ]

      for group in groups
        inputs = theClone.find(group.tag + '[' + group.attr + '*=' + inputID + ']')

        for input in inputs
          attr = $(input).attr(group.attr)
          regex = new RegExp(inputID + '(\\d)')

          matches = regex.exec(attr)
          continue if not matches

          num = Number(matches[1]) + 1
          attr = attr.replace(regex, inputID + num)
          $(input).attr(group.attr, attr)

      @resetCourseHtml(theClone)
      theClone.insertAfter(toClone)

  createRemoveClickListener: (btnSelector, specificitySelector, rmvSelector) ->
    $('#schd-courses').on 'click', btnSelector, (event) =>
      target = $(event.currentTarget)
      courseElements = target.closest(specificitySelector).find(rmvSelector)
      target.closest(rmvSelector).remove() if courseElements.length > 1


  resetCourseHtml: (course) ->
    course.find('input:text').val('')
    course.find('input-field > label').removeClass('active')
    course.find('input:checkbox').prop('checked', false)
    course.find('.schd-section').not(':first').remove()
    course.find('.schd-section-time').not(':first').remove()

  addMakeSchedulesListener: ->
    noSchedules = 'No schedules could be generated for that input'

    $('#make-schedules').on 'click', (event) =>
      try
        json = @makeJson()
        console.log 'MADE JSON:  ' + json

        jsonObj = JSON.parse(json);
        scheduler = new window.Scheduler(jsonObj)
        html = scheduler.makeSchedules()
        $('div#schedule-wrapper').html(html or noSchedules)
      catch err
        $('div#schedule-wrapper').html(err)



  makeJson: ->
    json = ''
    courses = $('#schd-courses').children('.schd-course')
    for course in courses
      json += @makeCourseJson $(course)
      json += ','

    json = util.removeLastChar json
    return '' if not json
    return '[' + json + ']'

  makeCourseJson: (course) ->
    name = @getValFirstChild(course, 'input.course-name').trim()
    number = name

    if not name or not number
      throw new Error "Invalid course name ({0}) or number ({1})".format(name, number)

    json = '{"name": "{0}", "number": "{1}", "sections": ['.format(name, number)
    sections = course.find('.schd-section')

    if sections.length is 0
      throw new Error "No sections found for course: {0}/{1}".format(name, number)

    for section in sections
      try
        json += @makeSectionJson $(section)
        json += ','
      catch err
        throw new Error err.message + " for course {0}/{1}".format(name, number)

    json = util.removeLastChar json
    json += ']}'
    return json

  makeSectionJson: (section) ->
    number = @getValFirstChild(section, 'input.sec-num')
    json = '{"number": "{0}", "sessions": ['.format(number)

    sessions = section.find('.schd-session')

    if not number
      throw new Error "Invalid section number ({0})".format(number)
    if sessions.length is 0
      throw new Error "No sessions found for section: {0}".format(number)

    for session in sessions
      json += @makeSessionJson $(session)
      json += ','

    json = util.removeLastChar json
    json += ']}'
    return json

  makeSessionJson: (session) ->
    checkedDays = session.find('input.schd-session-dow:checked')
    return '' if checkedDays.length is 0

    json = '{"dows": ['
    for checkedDay in checkedDays
      id = $(checkedDay).attr('id')
      day = $("label[for='" + id + "']").text();

      dow = ['S', 'M', 'T', 'W', 'R', 'F', 'Sa'].indexOf(day.trim())
      json += (dow + ',') if dow > 0

    json = util.removeLastChar(json)
    json += '],'

    startTime = @getValFirstChild(session, '.start-time > input')
    endTime = @getValFirstChild(session, '.end-time > input')

    json += '"startTime": "{0}","endTime": "{1}"}'.format(startTime, endTime)
    return json

  getValFirstChild: (jqueryObj, selector) ->
    children = jqueryObj.find(selector)
    firstChild = children[0]
    val = $(firstChild).val()
    return val or ''






window.SchedulerInput = SchedulerInput