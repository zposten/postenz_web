class SchedulerInput
  constructor: ->
    @addTimeListener()
    @addSectionListener()
    @addCourseListener()
    @addMakeSchedulesListener()

  @go: ->
    new SchedulerInput()

  addTimeListener: ->
    @add('.schd-add-time')
    @remove('.schd-rmv-time')

  addSectionListener: ->
    @add('.schd-add-section')
    @remove('.schd-rmv-section')

  addCourseListener: ->
    @add('.schd-add-course')
    @remove('.schd-rmv-course')


  add: (selector) ->
    $(selector).on 'click', (event) =>
      target = $(event.currentTarget)
      target.siblings('div').last().clone(true).insertBefore(target)

  remove: (selector) ->
    $(selector).on 'click', (event) =>
      siblings = $(event.currentTarget).siblings('div')
      siblings.last().remove() if siblings.length > 1


  addMakeSchedulesListener: ->
    $('#make-schedules').on 'click', (event) =>
      jsonObj = JSON.parse(@makeJson());
      scheduler = new window.Scheduler(jsonObj);
      $('div#schedule-wrapper').html(scheduler.makeSchedules());

  makeJson: ->
    json = ''
    courses = $('#schd-courses').children('.schd-course')
    for course in courses
      json += @makeCourseJson $(course)
      json += ','

    json = util.removeLastChar json
    json = '[' + json + ']';
    console.log json
    return json

  makeCourseJson: (course) ->
    name = @getValFirstChild(course, 'input.course-name').trim()
    number = name
    json = '{"name": "{0}", "number": "{1}", "sections": ['.format(name, number)

    sections = course.find('.schd-section')
    for section in sections
      json += @makeSectionJson $(section)
      json += ','

    json = util.removeLastChar json
    json += ']}'
    return json

  makeSectionJson: (section) ->
    number = @getValFirstChild(section, 'input.sec-num')
    json = '{"number": "{0}", "sessions": ['.format(number)

    sessions = section.find('.schd-section-time')
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