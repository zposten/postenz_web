class Session
  constructor: (dow, strStartTime, strEndTime) ->
    @startTime = util.parseTime(strStartTime)
    @endTime = util.parseTime(strEndTime)

  overlap: (otherSession) ->
    return (otherSession.startTime < @endTime and otherSession.endTime > @startTime) or
        (@startTime < otherSession.endTime and @endTime > otherSession.startTime)

class Section
  constructor: (courseName, courseNumber, sectionNum, jsonSessions) ->
    @courseName = courseName
    @courseNumber = courseNumber
    @sectionNum = sectionNum

    @sessions = []
    for jsonSession in jsonSessions
      for dow in jsonSession.dows
        @sessions.push(new Session(dow, jsonSession.startTime, jsonSession.endTime))

  overlap: (otherSection) ->
    overlap = false
    for mySession in @sessions
      for theirSession in otherSection.sessions
        overlap = overlap or mySession.overlap(theirSession)



class Course
  constructor: (name, number, sessions) ->
    @name = name
    @number = number
    @sessions = sessions


class Scheduler
  constructor: (jsonCourses) ->
    @courses = JSON.parse(jsonCourses)



  combine: ->
    chosen = []
    schedules = []
    recursiveCombine(@courses, chosen, schedules)

  recursiveCombine: (courses, chosen, schedules) ->
    if chosen.length is courses.length
      schedules.push(chosen)

    next = chosen.length
    course = chosen[next]

    for section in course
      if not overlap([section], chosen)
        chosen.push(section)
        recursiveCombine(courses, chosen, schedules)
        chosen.pop()

  overlap: (scheduleA, scheduleB) ->



    return false







