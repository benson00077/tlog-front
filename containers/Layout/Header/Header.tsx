
import Link from 'next/link'
import * as S from './styled'

export default function Header() {
  return (
    <S.NavBar>
      <Link href="/" passHref>
        logo
      </Link>
      <S.NavBarLinks>
        <Link href="/">
          <a>
            Home
          </a>
        </Link>
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