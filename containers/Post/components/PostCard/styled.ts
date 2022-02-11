import styled from "styled-components";
import { GlobalThemeProps } from "../../../../styled/golbalStyles";
import { flexMixin } from "../../../../styled/mixins";
import breakpoints from "../../../../styled/mediaQueryBreakpoints";

/**
 *  TODO: onhover no use in mobile and tablet size 
 *  Think of changing design - like first 3 post to be small card 
 *  and the others remain
 */

export const Box = styled.section`
  ${flexMixin("space-between")};
  height: 22rem;
  margin-bottom: 3rem;
  border-radius: 15px;
  box-shadow: 0 1px 20px -8px ${({ theme }: GlobalThemeProps) => theme.colors.fiveOpcityBlack};
  cursor: pointer;
  overflow: hidden;

  &:nth-of-type(2n) {
    flex-direction: row-reverse;
  }

  @media only screen and ${breakpoints.device.laptop} {
    display: block;
    position: relative;

    &:hover {
      img {
        transition: all 300ms ease;
        transform: scale(1.05);
        filter: blur(0px);
      }
    }
  }
`;

export const postPoster = styled.div`
  width: 33rem;
  overflow: hidden;
  background-color: black;
  img {
    height: 22rem;
    width: auto;
    transition: all 300ms ease;
  }

  @media only screen and ${breakpoints.device.laptop} {
    opacity: 0.4;
    img {
      filter: blur(4px);
    }
  }
`;

export const postInfo = styled.div`
  position: relative;
  ${flexMixin("space-between")};
  flex-direction: column;
  padding: 1.8rem 2.4rem;
  height: 22rem;
  width: 26rem;
  text-align: center;

  .date {
    opacity: 0.5;
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 0.9rem;
  }

  h2 {
    margin: 2rem;
  }

  p.summary {
    max-height: 5rem;
    overflow: hidden;
  }

  div.secondaryInfo {
    /* display: grid;
    grid-template-columns: 5% 5% 90%; */
    ${flexMixin("space-between")}
    width: 100%;
    height: 1rem;
  }

  @media only screen and ${breakpoints.device.laptop} {
    position: absolute;
    top: 0;
    width: 100%;
  }
`;
