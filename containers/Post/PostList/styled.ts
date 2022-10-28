import styled from 'styled-components'
import mediaQueryBreakpoints from 'styled/mediaQueryBreakpoints'
import { flexMixin } from 'styled/mixins'

export const Wrapper = styled.section`
  margin: auto 0;
  ${flexMixin()}
  flex-direction: column;

  .posts {
    max-width: ${mediaQueryBreakpoints.size.laptop};
    display: inline-grid;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    grid-gap: 25px 25px;
    /* margin-top: 10rem; */

    @media only screen and ${mediaQueryBreakpoints.device.laptop} {
      width: 80vw;
      grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    }
    @media only screen and ${mediaQueryBreakpoints.device.mobileL} {
      width: 90vw;
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }

  h3 {
    padding-bottom: 2rem;
    text-align: center;
  }
`
