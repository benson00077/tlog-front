
import Link from 'next/link'
import Logo from './Logo'
import * as S from './styled'

export default function Header() {
  return (
    <S.NavBar>
      <Link href="/" passHref>
        <a>
          <Logo />
        </a>
      </Link>
      <S.NavBarLinks>
        <Link href="/post">
          <a>
            Blog
          </a>
        </Link>
        <Link href="/archive">
          <a>
            Archive
          </a>
        </Link>
        <Link href="/about">
          <a>
            About
          </a>
        </Link>
      </S.NavBarLinks>
    </S.NavBar>
  )
}