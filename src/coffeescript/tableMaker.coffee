class TableMaker
  constructor: (@schedules) ->
    for schedule in @schedules
      makeHtml(schedule)

  makeHtml: (schedule) ->
    tableHtml = makeBaseTableHtml(schedule)
    classDivs = makeClassDivs(schedule)
    return '<div class="schedule"><div class="schedule-table">#{tableHtml}#{classDivs}</div></div>';


  makeBasicTableHtml: (sectionArr) ->
    thead = '<thead><tr><th class="time">Time</th><th>Monday</th><th>Tuesday</th>' +
      '<th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></thead>'

    rowTempl = $.templates("<tr><th>{{:time}}</th><td></td><td></td><td></td><td></td><td></td></tr>")
    tableRows = ''
    for hour in getTimeRange(schedule)
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

      first = ((first is null) or (secFirst < first)) secFirst: first
      last = ((last is null) or (secLast > last)) secLast: last

      first.setHours(first.getHours() - 1)
      last.setHours(last.getHours() + 1)

    return [first.getHours()..last.getHours()]


  makeClassDivs: (sectionArr) ->
