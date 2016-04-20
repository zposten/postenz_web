class SchedulerInput
  constructor: ->
    @addTimeListener()
    @addSectionListener()
    @addCourseListener()
    @addMakeSchedulesListener()

  @init: ->
    new SchedulerInput()

  addTimeListener: ->
    @createAddClickListener('.schd-add-time', '.schd-section', '.schd-section-time')
    @createRemoveClickListener('.schd-rmv-time', '.schd-section', '.schd-section-time')
    @hourSetAmPm('start')
    @hourSetAmPm('end')


  hourSetAmPm: (startEnd) ->
    hourSelector = '.schd-section-' + startEnd + '-time-hour'
    ampmSelector = '.schd-section-' + startEnd + '-time-period'

    $('#schd-courses').on 'change', hourSelector, (event) ->
      val = $(this).val()
      isAm = false
      for hour in [8..11]
        if `val == hour`
          isAm = true

      ampm = $(this).siblings(ampmSelector).last()
      ampm.val(if isAm then "AM" else "PM")


  addSectionListener: ->
    @createAddClickListener('.schd-add-section', '.schd-course', '.schd-section')
    @createRemoveClickListener('.schd-rmv-section', '.schd-course', '.schd-section')

  createAddClickListener: (btnSelector, specificitySelector, cloneSelector) ->
    $(btnSelector).on 'click', (event) =>
      target = $(event.currentTarget)

      toClone = target.closest(specificitySelector).find(cloneSelector).last()
      theClone = toClone.clone(true)
      @resetCourseHtml(theClone)
      theClone.insertAfter(toClone)

  createRemoveClickListener: (btnSelector, specificitySelector, rmvSelector) ->
    $(btnSelector).on 'click', (event) =>
      target = $(event.currentTarget)

      courseElements = target.closest(specificitySelector).find(rmvSelector)
      courseElements.last().remove() if courseElements.length > 1

  addCourseListener: ->
    $('.schd-add-course').on 'click', (event) =>
      toClone = $('div[schd-course]').last()
      theClone = toClone.clone(true)
      @resetCourseHtml(theClone)
      theClone.insertAfter(toClone)

    $('.schd-rmv-course').on 'click', (event) =>
      courses = $('div[schd-course]');
      courses.last().remove() if courses.length > 1

  resetCourseHtml: (course) ->
    course.find('.float-input').val('')
    course.find('select').attr('selectedIndex', 0)
    course.find('input:checkbox').prop('checked', false)
    course.find('.schd-section').not(':first').remove()
    course.find('.schd-section-time').not(':first').remove()



  addMakeSchedulesListener: ->
    noSchedules = 'No schedules could be generated'
    badJson = 'Invalid JSON string supplied'

    $('#make-schedules').on 'click', (event) =>
      try
        json = @makeJson()
        console.log 'MADE JSON:  ' + json

        jsonObj = JSON.parse(json);
        scheduler = new window.Scheduler(jsonObj)
        html = scheduler.makeSchedules()
        $('div#schedule-wrapper').html(html or noSchedules)
      catch err
        $('div#schedule-wrapper').html(badJson)



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

    sessions = section.find('.schd-section-time')

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
    checkedDays = session.find('input.schd-section-time-dow:checked')
    return '' if checkedDays.length is 0

    json = '{"dows": ['
    for checkedDay in checkedDays
      day = $(checkedDay).val()
      dow = ['S', 'M', 'T', 'W', 'R', 'F', 'Sa'].indexOf(day.trim())
      json += (dow + ',') if dow > 0

    json = util.removeLastChar(json)
    json += '],'

    startHour = @getValFirstChild(session, 'select.schd-section-start-time-hour')
    startMin = @getValFirstChild(session, 'select.schd-section-start-time-min')
    startPeriod = @getValFirstChild(session, 'select.schd-section-start-time-period')

    endHour = @getValFirstChild(session, 'select.schd-section-end-time-hour')
    endMin = @getValFirstChild(session, 'select.schd-section-end-time-min')
    endPeriod = @getValFirstChild(session, 'select.schd-section-end-time-period')

    str = '"startTime": "{0}:{1} {2}","endTime": "{3}:{4} {5}"}'
    json += str.format(startHour, startMin, startPeriod, endHour, endMin, endPeriod)
    return json

  getValFirstChild: (jqueryObj, selector) ->
    children = jqueryObj.find(selector)
    firstChild = children[0]
    val = $(firstChild).val()
    return val or ''






window.SchedulerInput = SchedulerInput