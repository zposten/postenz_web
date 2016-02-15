class Session
  constructor: (@dow, strStartTime, strEndTime) ->
    @startTime = @parseTime(strStartTime)
    @endTime = @parseTime(strEndTime)

  parseTime: (strTime) ->
    time = strTime.match(/(\d+)(?::(\d\d))?\s*([pP]?)/)
    d = new Date()
    hours = parseInt(time[1], 10)
    minutes = parseInt(time[2], 10)
    isPM = time[3]
    increment = if isPM then 12 else 0

    if hours is 12
      if isPM
        increment = 0
      else
        hours = 0

    d.setHours(hours + increment)
    d.setMinutes(minutes || 0)
    d.setSeconds(0)
    return d


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
    @sessions = []
    for jsonSession in jsonSessions
      for dow in jsonSession.dows
        @sessions.push new Session(dow, jsonSession.startTime, jsonSession.endTime)

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
    @parseObj(objCourses)

  parseObj: (jsonCourses) ->
    @courses = []
    for c in jsonCourses
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
    @schedules = @combine()
    tableMaker = new TableMaker(@schedules)
    return tableMaker.makeHtml()


window.Scheduler = Scheduler

test = {Section: Section, Session: Session}
window.test = test









