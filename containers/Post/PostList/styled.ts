import styled from "styled-components";
import breakpoints from "../../../styled/mediaQueryBreakpoints";

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
    margin-top: 10rem;
  }

  .tags {
    width: 50vw;

    h3 {
      padding-bottom: 2rem;
      text-align: center;
    }
  }
`;
