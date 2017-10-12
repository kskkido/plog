import * as React from 'react'

export interface Props {
  innerRef: Function,
  onToggleOn?: Function,
  onToggleOff?: Function,
}

const SVG = (props: Props) => {
  const { innerRef, onToggleOn, onToggleOff } = props

  return (
    <svg ref={(el: any) => innerRef(el)} onClick={() => onToggleOn && onToggleOn()} width="40" height="40" fill="white" xmlns="http://www.w3.org/2000/svg">
       <rect height="2" width="40" x="3" y="7" />
       <rect height="2" width="40" x="3" y="20" />
       <rect height="2" width="40" x="3" y="33" />
    </svg>
  )
}

export default SVG
