import React, { useRef, useEffect } from 'react'
import Gantt from '.'
import styled from 'styled-components'

const noop = () => {}

const GanttContainer = styled.div`
  overflow-x: scroll;
`

const GanttWrapper = (props) => {
  const { viewMode, tasks, onClick, onDateChange, onProgressChange, onViewChange } = props
  const _target = useRef()
  const _svg = useRef()
  const _gantt = useRef()

  useEffect(() => {
    const midOfSvg = _svg.current && _svg.current.clientWidth * 0.5
    if (_target.current) _target.current.scrollLeft = midOfSvg
  }, [])

  useEffect(() => {
    if (_gantt.current) {
      _gantt.current.refresh(tasks, {
        on_click: onClick || noop,
        on_date_change: onDateChange || noop,
        on_progress_change: onProgressChange || noop,
        on_view_change: onViewChange || noop
      })
      _gantt.current.change_view_mode(viewMode)
    } else {
      _gantt.current = new Gantt(_svg.current, tasks, {
        on_click: onClick || noop,
        on_date_change: onDateChange || noop,
        on_progress_change: onProgressChange || noop,
        on_view_change: onViewChange || noop
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, tasks])

  return (
    <GanttContainer ref={_target} style={{ overflow: 'hidden' }}>
      <svg
        ref={_svg}
      />
    </GanttContainer>

  )
}

export default GanttWrapper
