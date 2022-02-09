
import Link from 'next/link'
import * as S from './styled'

export default function Header() {
  return (
    <S.NavBar>
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
      </S.NavBarLinks>
    </S.NavBar>
  )
}