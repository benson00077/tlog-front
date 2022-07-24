import NoScrollLink from '../../../components/NoScrollLink/NoScrollLink'
import Logo from './Logo'
import * as S from './styled'

export default function Header() {
  return (
    <S.NavBar>
      <NoScrollLink href="/" passHref>
        <a>
          <Logo />
        </a>
      </NoScrollLink>
      <S.NavBarLinks>
        <NoScrollLink href="/post">
          <a>Blog</a>
        </NoScrollLink>
        <NoScrollLink href="/archive">
          <a>Archive</a>
        </NoScrollLink>
        <NoScrollLink href="/about">
          <a>About</a>
        </NoScrollLink>
      </S.NavBarLinks>
    </S.NavBar>
  )
}
