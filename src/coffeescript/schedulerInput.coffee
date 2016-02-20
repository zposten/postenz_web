class SchedulerInput
  constructor: ->
    @addTimeListener()
    @addSectionListener()
    @addCourseListener()



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



  makeJson: ->
    json = ''
    courses = $('#schd-courses').children('.schd-course')
    for course in courses
      json += @makeCourseJson course
      json += ','

    json = util.removeLastChar json
    return '[' + json + ']';

  makeCourseJson: (course) ->
    name = course.children('inout.course-name')[0].val()
    number = name
    json = '{"name": "{0}", "number": "{1}", "sections": ['.format(name, number)

    sections = course.children('.schd-section')
    for section in sections
      json += @makeSectionJson section
      json += ','

    json = util.removeLastChar json
    json += ']}'
    return json

  makeSectionJson: (section) ->
    number = section.children('input.sec-num')[0].val()
    json = '{"number": "{0}", "sessions": ['.format(number)

    sessions = section.children('.schd-section-time')
    for session in session
      json += @makeSessionJson session
      json += ','

    json = util.removeLastChar json
    json += ']}'
    return json

    makeSessionJson: (session) ->
      checkedDays = session.children('.dow-wrapper > input.schd-section-time-dow:checked')
      dows = []
      for checkedDay, index in checkedDays
        day = checkedDay.val()
        dow = ['M', 'T', 'W', 'R', 'F'].indexOf(day.trim())
        dows.push dow if dow > 0









window.SchedulerInput = SchedulerInput