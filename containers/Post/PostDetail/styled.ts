import styled from 'styled-components'
import { GlobalThemeProps } from '../../../styled/globalStyles'
import mediaQueryBreakpoints from '../../../styled/mediaQueryBreakpoints'
import { flexMixin } from '../../../styled/mixins'
import { h2marginTop } from '../../../styled/position'

export const rootWidth = '58rem'
const parallelLayout = {
  width: {
    columnLeft: `calc(${rootWidth} * 0.5)`,
    columnRight: `calc(${rootWidth} * 0.5)`,
    languageLeft: `calc(${rootWidth} * 0.5)`,
    languageRight: `calc(${rootWidth} * 0.5)`,
  },
}

export const Poster = styled.img`
  ${flexMixin()};
  width: 100%;
  object-fit: cover; // from background-size
  object-position: center center; // from background-position
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px ${({ theme }: GlobalThemeProps) => theme.colors.oneOpcityBlack},
    0 4px 6px -2px ${({ theme }: GlobalThemeProps) => theme.colors.oneOpcityBlack};
`

export const Title = styled.h1`
  margin: 2rem 0;
  font-size: 2.4rem;
  line-height: 1.6;
  text-align: center;
`

export const Summary = styled.blockquote`
  width: 100%;
  text-align: center;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }: GlobalThemeProps) => theme.text.base};
  background: ${({ theme }: GlobalThemeProps) => theme.background.summaryBg};
  border-left: 0.3rem solid ${({ theme }: GlobalThemeProps) => theme.colors.summaryBar};
  border-radius: 0.5rem;
`

export const PostRoot = styled.article`
  ${flexMixin('center')};
  flex-direction: column;
  position: relative; // for S.Date
  max-width: ${rootWidth};
  margin: 0 auto;

  @media only screen and ${mediaQueryBreakpoints.device.laptop} {
    margin: 0 2rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* text-align: center; */
  }

  // TODO: consider not using h1 in content
  h1 {
    margin: 2.75rem 0 1.25rem; //TODO
    font-size: 2.5rem;
  }

  h2 {
    margin: ${h2marginTop}rem 0 1.25rem 0;
    font-size: 2rem;
  }

  h3 {
    margin: 1.875rem 0 1.25rem;
    font-size: 1.7rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.75;
  }

  a {
    position: relative;
    color: ${({ theme }: GlobalThemeProps) => theme.colors.linkBlue};

    &:hover {
      text-decoration: underline ${({ theme }: GlobalThemeProps) => theme.colors.linkBase};
    }
  }

  /* ol,
  ul {
    padding-left: 2rem;
  } */

  li {
    line-height: 1.6;
  }

  .indent2 {
    padding-left: 2rem;
  }

  .indent4 {
    padding-left: 4rem;
  }

  strong {
    // crayan effect
    position: relative;

    &:before {
      content: '';
      z-index: -1;
      left: -0.5em;
      top: -0.1em;
      border: 2px solid;
      border-color: ${({ theme }: GlobalThemeProps) => theme.colors.textHighlight};
      position: absolute;
      border-right-color: transparent;
      width: 100%;
      height: 1em;
      transform: rotate(2deg);
      opacity: 0.7;
      border-radius: 50%;
      padding: 0.1em 0.25em;
    }
    &:after {
      content: '';
      z-index: -1;
      left: -0.5em;
      top: 0.1em;
      padding: 0.1em 0.25em;
      border: 2px solid;
      border-color: ${({ theme }: GlobalThemeProps) => theme.colors.textHighlight};
      border-left-color: transparent;
      border-top-color: transparent;
      position: absolute;
      width: 100%;
      height: 1em;
      transform: rotate(-1deg);
      opacity: 0.7;
      border-radius: 50%;
    }
  }
`

export const Markdown = styled.div`
  width: 100%;

  code {
    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  }

  // -- inline code
  p code,
  li code {
    background: ${({ theme }: GlobalThemeProps) => theme.background.inlineCode};
    font-size: 90%;
    border-radius: 0.4rem;
    padding: 0.2rem 0.4rem;
  }

  // -- quote in markdown as used in github ( pre > code )
  .quote {
    padding: 1.5rem 1rem;
    margin: 2rem 0 4rem 0;
    background: ${({ theme }: GlobalThemeProps) => theme.background.secondary};
    border-left: 0.3rem solid ${({ theme }: GlobalThemeProps) => theme.colors.sloganBlue};
    border-radius: 0.5rem;

    pre {
      line-height: 1.5;
      // Long quote
      // TODO: inline ele have no width, would casue overflow
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  // -- code block. not quote in markdown. not inline code
  .columnLeft {
    display: block;
    float: left;
    width: ${parallelLayout.width.columnLeft};
    padding-right: 2rem;
    @media only screen and ${mediaQueryBreakpoints.device.laptopL} {
      float: none;
      width: 100%;
    }
  }
  .columnRight {
    margin-top: 1rem;
    float: left;
    clear: right;
    width: ${parallelLayout.width.columnRight};
    line-height: 1.5;
    @media only screen and ${mediaQueryBreakpoints.device.laptopL} {
      float: none;
      width: 100%;
    }

    &::after {
      content: ' ';
    }
  }
  .clearFloat {
    clear: both;
  }

  // -- code block popup
  @media only screen and (min-width: ${mediaQueryBreakpoints.size.laptopL}) {
    .columnRight:hover {
      cursor: pointer;
    }
    .expand {
      width: 49vw;
      float: none;
    }
  }

  // -- language block.
  .languageLeft {
    display: block;
    float: left;
    clear: both;
    width: ${parallelLayout.width.languageLeft};
    padding-right: 2rem;
    @media only screen and ${mediaQueryBreakpoints.device.laptopL} {
      float: none;
      width: 100%;
    }
  }
  .languageRight {
    float: left;
    clear: right;
    width: ${parallelLayout.width.languageRight};
    line-height: 1.5;
    @media only screen and ${mediaQueryBreakpoints.device.laptopL} {
      float: none;
      width: 100%;
    }

    &::after {
      content: ' ';
    }
  }

  /**
  *  Handle Section inserted by remark-sectionize plugin
  *  Styled as thread-line 
  */
  section {
    position: relative;
    clear: both; // because code block have float:right;
    /* box-shadow: -2px 0 red; */
    margin: 0.5rem 0 0.5rem 0;

    /** 
     * NOTICE:
     *     Only Chrome^105 and Safari support :has selector
    */
    &:has(section) {
      /* as thread-line */
      &::before {
        display: block;
        content: '';
        position: absolute;
        left: -1.5rem;
        height: 100%;
        width: 2px;
        background-color: ${({ theme }: GlobalThemeProps) => theme.border};
      }

      /* as thread-line-child */
      & section h3::before {
        display: block;
        content: '';
        position: absolute;
        left: -1.5rem;
        height: 20px;
        width: 20px;
        border-left: 2px ${({ theme }: GlobalThemeProps) => theme.border} solid;
        border-bottom: 2px ${({ theme }: GlobalThemeProps) => theme.border} solid;
        border-bottom-left-radius: 10px;
      }

      /* as thread-line-child coverage line */
      & > section:last-child::before {
        display: block;
        content: '';
        position: absolute;
        top: 14.5px; // similar to thread-line-child's height
        left: -1.5rem;
        height: 100%;
        width: 2px;
        border-left: 2.5px ${({ theme }: GlobalThemeProps) => theme.background.primary} solid;
        background-color: ${({ theme }: GlobalThemeProps) => theme.background.primary};
      }
    }
  }
`
type IconProps = {
  width: string
  height: string
}
export const Icon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: 1.3rem;
  left: calc(-1.5rem - 10.4px / 2 + 1px);
  box-shadow: 0 -16px 2px 8px ${({ theme }: GlobalThemeProps) => theme.background.primary};
`
export const ThreadLineTriangle = styled.polygon`
  fill: ${({ theme }: GlobalThemeProps) => theme.border};
`

export const Info = styled.div`
  ${flexMixin('center')};
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  color: ${({ theme }: GlobalThemeProps) => theme.text.secondary};
`

export const Date = styled.time`
  position: absolute;
  right: 1rem;
`

export const Table = styled.div`
  ${flexMixin('center')};

  table {
    margin: 2rem 0;
    border-collapse: collapse;

    tr:nth-of-type(2n) {
      background-color: ${({ theme }: GlobalThemeProps) => theme.background.secondary};
    }

    td,
    th {
      line-height: 1.4;
      border: 1px solid ${({ theme }: GlobalThemeProps) => theme.border};
      padding: 0.8rem;
    }

    th {
      font-weight: 700;
    }
  }
`
