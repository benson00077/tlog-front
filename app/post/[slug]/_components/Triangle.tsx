import { GiMoebiusTriangle } from 'react-icons/gi'
import { GiMoebiusTrefoil } from 'react-icons/gi'
import { TbGitCommit } from 'react-icons/tb'
import { RiGitCommitFill } from 'react-icons/ri'
import { GiGraspingClaws } from 'react-icons/gi'
import { GoTriangleRight } from 'react-icons/go'
import { GiLifeBuoy } from 'react-icons/gi'
import { GiSharpShuriken } from 'react-icons/gi'
import { GiSpiralBloom } from 'react-icons/gi'

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
    <GiSpiralBloom size={30} className="absolute top-[0.25rem] left-[-194px]" />
    /** Alternatives: */
    // <RiGitCommitFill size={30} className="absolute rotate-90 top-[0.35rem] left-[-194px]" />
    // <GoTriangleRight size={30} className="absolute top-[0.35rem] left-[-200px]" />
    // <GiLifeBuoy size={30} className="absolute rotate-45 top-[0.35rem] left-[-194px] z-40" />
    // <GiMoebiusTrefoil size={30} className="absolute top-[0.5rem] left-[-194px]" />
    // <GiSharpShuriken size={30} className="absolute top-[0.5rem] left-[-194px]" />
  )
}
