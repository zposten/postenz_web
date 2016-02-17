class TableMaker
  constructor: (sectionDoubleArr) ->
    @schedules = sectionDoubleArr

  makeHtml: ->
    tables = []
    for sectionArr in @schedules
      tableHtml = @makeBasicTableHtml(sectionArr)
      classDivs = @makeClassDivs(sectionArr)
      tables.push '<div class="schedule"><div class="schedule-table">' + tableHtml + classDivs + '</div></div>'
    return tables;


  makeBasicTableHtml: (sectionArr) ->
    thead = '<thead><tr><th class="time">Time</th><th>Monday</th><th>Tuesday</th>' +
      '<th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></thead>'

    rowTempl = $.templates("<tr><th>{{:time}}</th><td></td><td></td><td></td><td></td><td></td></tr>")
    tableRows = ''
    @tableTimeRange = @getTimeRange(sectionArr)

    for hour in @tableTimeRange
      tableRows += rowTempl.render({time: util.formatHour(hour)})

    tableHtml = "<table>#{thead}<tbody>#{tableRows}</tbody></table>"
    return tableHtml


  getTimeRange: (sectionArr) ->
    first = null
    last = null

    for section in sectionArr
      secFirst = null
      secLast = null
      for session in section.sessions
        if (secFirst == null) or (session.startTime < secFirst)
          secFirst = session.startTime
        if (secLast == null) or (session.endTime > secLast)
          secLast = session.endTime

      first = secFirst if (first is null) or (secFirst < first)
      last = secLast if (last is null) or (secLast > last)

    return [0] if first is null or last is null

    startHour = first.getHours()
    endHour = last.getHours();

    endHour++ if last.getMinutes() > 0
    startHour--
    endHour++

    return [startHour..endHour]


  makeClassDivs: (sectionArr) ->
    divs = []

    tableStartTime = new Date()
    range = @tableTimeRange
    tableStartTime.setHours range[0]
    tableStartTime.setMinutes(0)

    sectionIndex = 0
    for sec in sectionArr
      for ses in sec.sessions
        classDiv = @makeClassDiv(
          sec.courseNumber, sec.number, ses.dow,
          sectionIndex, ses.startTime, ses.lengthInMins(), tableStartTime
        )
        divs.push classDiv
      sectionIndex++

    return divs.join("\n")

  makeClassDiv: (courseNumber, sectionNumber, dow, colorIndex, classStartTime, lengthInMins, tableStartTime) ->
    baseHtml = [
      "<div class='{{:dayClass}} {{:colorClass}}' style='height: {{:height}}px;top: {{:top}}px;'>"
      "  <div class='course-text'>"
      "    <span class='course-name'>{{:courseNumber}}/{{:sectionNumber}}</span>"
      "  </div>"
      "</div>"
    ].join("\n")

    dataObj = {
      dayClass: @getDayClass(dow)
      colorClass: @getColorClass(colorIndex)
      height: @calcHeight(lengthInMins)
      top: @calcTopMargin(classStartTime, tableStartTime)
      courseNumber: courseNumber
      sectionNumber: sectionNumber
    }
    return $.templates(baseHtml).render(dataObj)

  getDayClass: (dow) ->
    switch dow
      when 1 then return 'dayM'
      when 2 then return 'dayT'
      when 3 then return 'dayW'
      when 4 then return 'dayR'
      when 5 then return 'dayF'
    return ''

  getColorClass: (colorIndex) ->
    return 'color' + colorIndex

  calcHeight: (lengthInMins) ->
    return @pixelHeightOfOneMin() * lengthInMins

  pixelHeightOfOneMin: ->
    return 49 / 60 # 49 pixels tall divided by 60 mins/hr

  calcTopMargin: (classStartTime, tableStartTime) ->
    hourOffset = classStartTime.getHours() - tableStartTime.getHours()
    minuteOffset = (hourOffset * 60) + classStartTime.getMinutes() - tableStartTime.getMinutes()
    titleBarHeight = 27 # pixels

    return titleBarHeight + (@pixelHeightOfOneMin() * minuteOffset)



window.TableMaker = TableMaker