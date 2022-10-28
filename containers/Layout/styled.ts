import styled from 'styled-components'
import { navHeight } from 'styled/position'

export const Layouts = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const Main = styled.main`
  flex: 1;
  margin-top: ${navHeight};
  // collide w/ position: sitkcy from toc(table of content) from postDetail.tsx on Chrome
  // overflow-x: hidden;
`
