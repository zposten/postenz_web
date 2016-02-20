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
      console.log siblings
      siblings.last().remove() if siblings.length > 1



window.SchedulerInput = SchedulerInput