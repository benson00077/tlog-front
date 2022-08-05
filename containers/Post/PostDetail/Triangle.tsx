import { Icon, ThreadLineTriangle } from './styled'

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
    <Icon width={w + 'px'} height={h + 'px'}>
      <ThreadLineTriangle points={points[direction].join(' ')} />
    </Icon>
  )
}
