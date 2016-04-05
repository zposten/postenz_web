class SchedulerInput
  constructor: ->
    @addTimeListener()
    @addSectionListener()
    @addCourseListener()
    @addMakeSchedulesListener()

  @init: ->
    new SchedulerInput()

  addTimeListener: ->
    @add('.schd-add-time')
    @remove('.schd-rmv-time')
    @hourSetAmPm('start')
    @hourSetAmPm('end')


  hourSetAmPm: (startEnd) ->
    hourSelector = '.schd-section-' + startEnd + '-time-hour'
    ampmSelector = '.schd-section-' + startEnd + '-time-period'

    $(hourSelector).on 'change', (event) ->
      val = $(this).val()
      isAm = false
      for hour in [8..11]
        if `val == hour`
          isAm = true

      ampm = $(this).siblings(ampmSelector).last()
      ampm.val(if isAm then "AM" else "PM")


  addSectionListener: ->
    @add('.schd-add-section')
    @remove('.schd-rmv-section')

  addCourseListener: ->
    @add('.schd-add-course')
    @remove('.schd-rmv-course')

  add: (selector) ->
    $(selector).on 'click', (event) =>
      target = $(event.currentTarget)
      clone = target.siblings('div').last().clone(true)
      @resetCourseHtml(clone)
      clone.insertBefore(target)

  remove: (selector) ->
    $(selector).on 'click', (event) =>
      siblings = $(event.currentTarget).siblings('div')
      siblings.last().remove() if siblings.length > 1

  resetCourseHtml: (course) ->
    course.find('.float-input').val('')
    course.find('select').attr('selectedIndex', 0)
    course.find('input:checkbox').prop('checked', false)
    course.find('.schd-section').not(':first').remove()
    course.find('[select-time]').not(':first').remove()



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