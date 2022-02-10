import styled from "styled-components";
import { GlobalThemeProps } from "../../../../styled/golbalStyles";
import { flexMixin } from "../../../../styled/mixins";
import breakpoints from '../../../../styled/mediaQueryBreakpoints';


export const Box = styled.div`
  ${flexMixin("space-between")};
  height: 22rem;
  /* width: 50vw; */
  margin-bottom: 3rem;
  border-radius: 25px;
  box-shadow: 0 1px 20px -8px ${({ theme }: GlobalThemeProps) => theme.colors.fiveOpcityBlack};
  cursor: pointer;
  overflow: hidden;

  &:nth-of-type(2n) {
    flex-direction: row-reverse;
  }

  @media only screen and ${breakpoints.device.laptop} {
    flex-direction: column;

    &:nth-of-type(2n) {
      flex-direction: column;
    }
  }

  // flexbox item 1
  .imgBox {
    width: 33rem;
    overflow: hidden;
    background-color: black;
    img {
      height: 22rem;
      width: auto;
    }
  }

  // flexbox item 2
  .postInfo {
    padding: 1.8rem 2.4rem;
    width: 26rem;
  }
`;

export const SummaryParagraph = styled.p`
  max-height: 2.5rem;
  overflow: hidden;
`;
