import styled from "styled-components";
import mediaQueryBreakpoints from "../../../styled/mediaQueryBreakpoints";
import { flexMixin } from "../../../styled/mixins";

export const Wrapper = styled.section`
  display: grid;
  /* grid-template-columns: 59rem 28rem; */
  grid-column-gap: 3.6rem;
  justify-content: center;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  .posts {
    width: 80%;
    display: inline-grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    grid-gap: 25px 25px;
    margin-top: 10rem;

    .postsGridItem {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @media only screen and ${mediaQueryBreakpoints.device.mobileL} {
      width: 95%;
      grid-template-columns: repeat(auto-fit, minmax(80vw, 1fr));
    }
  }

  .tags {
    width: 50vw;

    h3 {
      padding-bottom: 2rem;
      text-align: center;
    }

    .cloud {
      ${flexMixin()};
      flex-wrap: wrap;
    }
  }
`;
