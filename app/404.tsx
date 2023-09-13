import styled from 'styled-components'
import NoScrollLink from 'components/NoScrollLink/NoScrollLink'
import { GlobalThemeProps } from 'styled/globalStyles'
import { flexMixin } from 'styled/mixins'

const SRoot = styled.div`
  ${flexMixin('space-around')};
  flex-direction: column;
  min-height: 100vh;
`

const SHomeBtn = styled.button`
  padding: 1rem 1.6rem;
  color: ${({ theme }: GlobalThemeProps) => theme.colors.black};
  background: ${({ theme }: GlobalThemeProps) => theme.colors.pink};
  border: none;
  border-radius: 15px;
  cursor: pointer;
`

export default function Custom404() {
  return (
    <SRoot>
      <h1>Error: 404 - Page Not Found</h1>
      <NoScrollLink href="/">
        <SHomeBtn>Back 2 Home</SHomeBtn>
      </NoScrollLink>
    </SRoot>
  )
}
