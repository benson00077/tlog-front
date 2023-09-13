import NoScrollLink from 'components/NoScrollLink/NoScrollLink'
import { useFocus } from 'hooks/useFocus'
import Logo from './Logo'

export default function Header() {
  // const { focus } = useFocus({
  //   component: 'NavBar',
  //   ifFocus: true,
  // })
  const focus = true

  return (
    // <S.NavBar translateY={focus ? '0px' : '-100%'} opacity={focus ? '1' : '0'}>
    <div
      className={`flex items-center justify-between fixed w-full h-12 py-0 z-10 select-none ${
        focus ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <NoScrollLink href="/" passHref>
        <Logo />
      </NoScrollLink>
      <div className="flex items-start">
        <NoScrollLink href="/post" className="relative flex justify-center mx-6 text-xs item-center">
          Blog
        </NoScrollLink>
        <NoScrollLink href="/about" className="relative flex justify-center mx-6 text-xs item-center">
          About
        </NoScrollLink>
        {/* <NoScrollLink href="/archive">
          <a>Archive</a>
        </NoScrollLink>
        <NoScrollLink href="/about">
          <a>About</a>
        </NoScrollLink> */}
      </div>
    </div>
  )
}
