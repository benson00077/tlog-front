import styled from 'styled-components'
import { flexMixin } from '../../../styled/mixins'
import { navHeight } from '../../../styled/position'

type NavBarProps = {
  translateY: string
}
export const NavBar = styled.nav<NavBarProps>`
  position: fixed;
  ${flexMixin('space-between')}
  width: 100%;
  height: ${navHeight};
  padding: 0 6.5rem 0 2.4rem;
  opacity: 0.95;
  z-index: 10;
  user-select: none;
  transform: translateY(${(props) => props.translateY});
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

export const NavBarLinks = styled.div`
  ${flexMixin('flex-start')}

  & a {
    position: relative;
    ${flexMixin()}
    font-size: 1rem;
    margin-left: 1.6rem;
  }
`

export const LogoRoot = styled.div`
  position: relative;
  top: 5px;
  left: -2rem;
  width: 50px;
`
