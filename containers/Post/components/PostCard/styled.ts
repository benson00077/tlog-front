import styled from 'styled-components'
import { GlobalThemeProps } from '../../../../styled/globalStyles'
import { flexMixin } from '../../../../styled/mixins'
import mediaQueryBreakpoints from '../../../../styled/mediaQueryBreakpoints'

export const postPoster = styled.div`
  width: 33rem;
  overflow: hidden;
  opacity: 0.4;
  z-index: -1;
  position: absolute;
  left: 0;

  img {
    height: 22rem;
    max-width: 33rem;
    object-fit: cover; // from background-size
    object-position: center center; // from background-position
    filter: blur(8px);
    transition: all 300ms cubic-bezier(0.25, 0.1, 0.3, 1.5);

    // Ineract w/ Box:hover{ img {} }
    @media only screen and ${mediaQueryBreakpoints.device.mobileL} {
      filter: blur(0px);
    }
  }
`

export const postInfo = styled.div`
  ${flexMixin('space-between')};
  padding: 30px;
  flex-direction: column;
  /* padding: 1.8rem 2.4rem; */
  height: 22rem;
  width: 100%;
  text-align: center;
  color: ${({ theme }: GlobalThemeProps) => theme.text.post};

  @media only screen and ${mediaQueryBreakpoints.device.mobileL} {
    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }: GlobalThemeProps) => theme.background.hoveredCard};
    }
  }

  .tag {
    /* opacity: 0.5; */
    /* position: absolute; */
    /* top: 1rem;
    right: 1rem; */
  }

  h2 {
    margin-top: 0.5rem;
  }

  p.summary {
    max-height: 5rem;
  }

  div.secondaryInfo {
    ${flexMixin('space-between')}
    width: 100%;
    height: 1rem;

    .date {
      margin-left: auto;
      opacity: 0.5;
      font-size: 0.9rem;
    }
  }

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const Box = styled.section`
  display: block;
  position: relative;
  width: 100%;
  ${flexMixin('center')};
  height: 22rem;
  border-radius: 15px;
  box-shadow: 0 1px 20px -8px ${({ theme }: GlobalThemeProps) => theme.colors.fiveOpcityBlack};
  cursor: pointer;
  overflow: hidden;

  &:hover {
    img {
      transition: all 300ms cubic-bezier(0.25, 0.1, 0.3, 1.5);
      transform: scale(1.05);
      filter: blur(0px);
    }

    ${postInfo}::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }: GlobalThemeProps) => theme.background.hoveredCard};
    }
  }
`
