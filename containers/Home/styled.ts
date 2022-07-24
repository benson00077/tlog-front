import styled from 'styled-components'
import { flexMixin } from '../../styled/mixins'

export const Main = styled.section`
  margin: 0 auto;
  max-width: 50%;
  text-align: center;
  ${flexMixin('space-around')};
  flex-direction: column;
  height: 85vh;

  h1 {
    font-size: 4rem;
    font-weight: 700;
    line-height: 4.5rem;
  }

  div {
    /* position: relative;
    top: 20rem; */
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
`
