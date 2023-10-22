type triangleProps = {
  w?: number
  h?: number
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

export const Triangle = ({ w = 12, h = 12, direction = 'bottom' }: triangleProps) => {
  const points = {
    top: [`${w / 2},0`, `0,${h}`, `${w},${h}`],
    right: [`0,0`, `0,${h}`, `${w},${h / 2}`],
    bottom: [`0,0`, `${w},0`, `${w / 2},${h}`],
    left: [`${w},0`, `${w},${h}`, `0,${h / 2}`],
  }

  return (
    <svg width={w} height={h} className="absolute top-[1.3rem] left-[-1.5rem] shadow-[0_-16px_2px_8px_rgba(31,41,55)] ">
      <polygon fill="#5b5b5b" points={points[direction].join(' ')}></polygon>
    </svg>
  )
}
