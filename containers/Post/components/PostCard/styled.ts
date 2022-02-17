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
  display: block;
  position: relative;
  width: 33rem;
  ${flexMixin("center")};
  height: 22rem;
  border-radius: 15px;
  box-shadow: 0 1px 20px -8px ${({ theme }: GlobalThemeProps) => theme.colors.fiveOpcityBlack};
  cursor: pointer;
  overflow: hidden;

  &:hover {
    img {
      transition: all 300ms ease;
      transform: scale(1.05);
      filter: blur(0px);
    }
  }
`;

export const postPoster = styled.div`
  width: 33rem;
  overflow: hidden;
  opacity: 0.4;
  position: absolute;
  left: 0;

  img {
    height: 22rem;
    max-width: 33rem;
    object-fit: cover; // from background-size
    object-position: center center; // from background-position
    filter: blur(4px);
    transition: all 300ms ease;

    @media only screen and ${breakpoints.device.laptop} {
      filter: blur(0px);
    }
  }
`;

export const postInfo = styled.div`
  ${flexMixin("space-between")};
  flex-direction: column;
  padding: 1.8rem 2.4rem;
  height: 22rem;
  width: 30rem;
  text-align: center;
  color: ${({ theme }: GlobalThemeProps) => theme.text.post};

  &::after {
    content: " ";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 30rem;
    height: 22rem;
    background: inherit;
    background-attachment: fixed;
    filter: blur(12px);
    z-index: 1000;
  }

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
    ${flexMixin("space-between")}
    width: 100%;
    height: 1rem;
  }
`;
