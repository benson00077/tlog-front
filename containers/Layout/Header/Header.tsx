import NoScrollLink from 'components/NoScrollLink/NoScrollLink'
import { useFocus } from 'hooks/useFocus'
import Logo from './Logo'
import * as S from './styled'

export default function Header() {
  const { focus } = useFocus({
    component: 'NavBar',
    ifFocus: true,
  })

  return (
    <S.NavBar translateY={focus ? '0px' : '-100%'} opacity={focus ? '1' : '0'}>
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
