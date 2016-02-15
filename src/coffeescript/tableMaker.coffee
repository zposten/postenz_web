class TableMaker
  constructor: (sectionDoubleArr) ->
    @schedules = sectionDoubleArr

  makeHtml: (schedule) ->
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
    for hour in @getTimeRange(sectionArr)
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

    # If last goes past the hour, add an additional hour
    last.setHours(last.getHours() + 1) if last.getMinutes() > 0

    # Add one hour on either side of the range
    first.setHours(first.getHours() - 1)
    last.setHours(last.getHours() + 1)

    return [first.getHours()..last.getHours()]


  makeClassDivs: (sectionArr) ->
    return ''

window.TableMaker = TableMaker