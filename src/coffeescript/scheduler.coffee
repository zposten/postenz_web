class Session
  constructor: (@dow, strStartTime, strEndTime) ->
    @startTime = Session.parseTime(strStartTime)
    @endTime = Session.parseTime(strEndTime)

    if @endTime < @startTime
      throw new Error "Invalid Session: End time must be after start time"

  @parseTime: (strTime) ->
    time = strTime.match(/(\d+)(?::(\d\d))?\s*([pP]?)/)
    hours = parseInt(time[1], 10)
    minutes = parseInt(time[2], 10)
    isPM = time[3]

    increment = if isPM then 12 else 0
    if hours is 12
      if isPM
        increment = 0
      else
        hours = 0

    date = new Date()
    date.setHours(hours + increment)
    date.setMinutes(minutes || 0)
    date.setSeconds(0)
    return date

  lengthInMins: ->
    hourOffset = @endTime.getHours() - @startTime.getHours()
    minuteOffset = @endTime.getMinutes() - @startTime.getMinutes()
    return (hourOffset * 60) + minuteOffset

  overlap: (otherSession) ->
    onSameDay = @dow is otherSession.dow
    return false if not onSameDay

    thatStartsB4ThisEnds = otherSession.startTime < @endTime
    thatEndsAfterThisStarts = otherSession.endTime > @startTime
    thisOverlapsThat = thatStartsB4ThisEnds and thatEndsAfterThisStarts

    thisStartsB4ThatEnds = @startTime < otherSession.endTime
    thisEndsAfterThatStarts = @endTime > otherSession.startTime
    thatOverlapsThis = thisStartsB4ThatEnds and thisEndsAfterThatStarts

    return thisOverlapsThat or thatOverlapsThis

class Section
  constructor: (@courseName, @courseNumber, @number, jsonSessions) ->
    info = "courseName=>'{0}', courseNumber=>'{1}', number=>'{2}'".format(@courseName, @courseNumber, @number)
    if not @courseName or not @courseNumber or not @number
      throw new Error "Invalid JSON: Section info: " + info

    @sessions = []
    for jsonSession in jsonSessions
      if (not jsonSession.dows) or (jsonSession.dows.length is 0)
        throw new Error "Invalid JSON: No dows selected for section: " + info
      for dow in jsonSession.dows
        try
          @sessions.push new Session(dow, jsonSession.startTime, jsonSession.endTime)
        catch err
          throw new Error "For Section: {0}: {1}".format(info, err.message)

  overlap: (otherSection) ->
    overlap = false
    for mySession in @sessions
      for theirSession in otherSection.sessions
        overlap = overlap or mySession.overlap(theirSession)
    return overlap

class Course
  constructor: (@name, @number, @sections = []) ->
  addSection: (section) ->
    @sections.push section

class Scheduler
  constructor: (objCourses) ->
    try
      @parseObj(objCourses)
    catch err
      console.error err.stack

  parseObj: (@jsonCourses) ->
    @courses = []
    for c in @jsonCourses
      course = new Course(c.name, c.number);
      for sec in c.sections
        course.addSection new Section(c.name, c.number, sec.number, sec.sessions)
      @courses.push course

  combine: ->
    schedules = []
    @recursiveCombine(@courses, [], schedules)
    return schedules

  recursiveCombine: (courses, chosenSections, schedules) ->
    if chosenSections.length is Object.size(courses)
      schedules.push [chosenSections...]
      return

    next = chosenSections.length
    course = courses[next]
    for section in course.sections
      if not @overlap(section, chosenSections)
        chosenSections.push section
        @recursiveCombine(courses, chosenSections, schedules)
        chosenSections.pop()


  overlap: (secA, sectionsArr) ->
    for secB in sectionsArr
      return true if secA.overlap(secB)
    return false

  makeSchedules: ->
    if (not @courses) or (@courses.length is 0)
      return 'An error occurred in Scheduler while parsing JSON'

    @schedules = @combine()

    if @schedules.length is 0
      console.log 'No schedules could be generated from:'
      console.log @courses
      return ''

    tableMaker = new TableMaker(@schedules)
    return tableMaker.makeHtml()


window.Scheduler = Scheduler

test = {Section: Section, Session: Session}
window.test = test









