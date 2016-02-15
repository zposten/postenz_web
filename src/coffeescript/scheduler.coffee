class Session
  constructor: (@dow, strStartTime, strEndTime) ->
    @startTime = util.parseTime(strStartTime)
    @endTime = util.parseTime(strEndTime)

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
  constructor: (@courseName, @courseNumber, @sectionNum, jsonSessions) ->
    @sessions = []
    for jsonSession in jsonSessions
      for dow in jsonSession.dows
        @sessions.push new Session(dow, jsonSession.startTime, jsonSession.endTime)

  overlap: (otherSection) ->
    overlap = false
    for mySession in @sessions
      for theirSession in otherSection.sessions
        overlap = overlap or mySession.overlap(theirSession)


class Scheduler
  constructor: (objCourses) ->
    @parseObj(objCourses)

  parseObj: (jsonCourses) ->
    @courses = []
    for c in jsonCourses
      course = {name: c.name, number: c.number, sections: []}
      for sec in c.sections
        course.sections.push new Section(c.name, c.number, sec.number, sec.sessions)
      @courses.push course

  combine: ->
    schedules = []
    @recursiveCombine(@courses, [], schedules, 0)
    return schedules

  recursiveCombine: (courses, chosenSections, schedules, level) ->
    tabs = ''
    for i in [0..level]
      tabs += '\t'
    console.log tabs + "courses:  " + JSON.stringify(courses)
    console.log tabs + "chosenSections:  " + JSON.stringify(chosenSections)
    console.log tabs + "schedules:  " + JSON.stringify(schedules)
    console.log '====================================='

    if chosenSections.length is Object.size(courses)
      schedules.push chosenSections
      return

    next = chosenSections.length
    course = courses[next]

    for section in course
      if not @overlap(section, chosenSections)
        chosenSections.push section
        @recursiveCombine(courses, chosenSections, schedules, level+1)
        chosenSections.pop

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









