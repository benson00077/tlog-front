
import Link from 'next/link'
import Logo from './Logo'
import * as S from './styled'

/**
 *  NOTICE: <Link scroll={false}> for smoother page tranision by Framer Motion
 */
export default function Header() {
  return (
    <S.NavBar>
      <Link href="/" passHref scroll={false}>
        <a>
          <Logo />
        </a>
      </Link>
      <S.NavBarLinks>
        <Link href="/post" scroll={false}>
          <a>
            Blog
          </a>
        </Link>
        <Link href="/archive" scroll={false}>
          <a>
            Archive
          </a>
        </Link>
        <Link href="/about" scroll={false}>
          <a>
            About
          </a>
        </Link>
      </S.NavBarLinks>
    </S.NavBar>
  )
}