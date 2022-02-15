import styled from "styled-components";
import { GlobalThemeProps } from "../../../styled/golbalStyles";
import mediaQueryBreakpoints from "../../../styled/mediaQueryBreakpoints";
import { flexMixin } from "../../../styled/mixins";

export const Poster = styled.img`
  ${flexMixin()};
  width: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px ${({ theme }: GlobalThemeProps) => theme.colors.oneOpcityBlack},
    0 4px 6px -2px ${({ theme }: GlobalThemeProps) => theme.colors.oneOpcityBlack};
`;

export const Title = styled.h1`
  margin: 2rem 0;
  font-size: 2.4rem;
  line-height: 1.6;
  text-align: center;
`;

export const Summary = styled.blockquote`
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }: GlobalThemeProps) => theme.text.base};
  background: ${({ theme }: GlobalThemeProps) => theme.background.summaryBg};
  border-left: 0.3rem solid
    ${({ theme }: GlobalThemeProps) => theme.colors.summaryBar};
  border-radius: 0.5rem;
`;

export const PostRoot = styled.article`
  max-width: 58rem;
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
    text-align: center;
  }

  // TODO: consider not using h1 in content
  h1 {
    margin: 2.75rem 0 1.25rem; //TODO
    font-size: 2.4rem;
  }

  h2 {
    margin: 2.5rem 0 1.25rem;
    font-size: 2rem;
  }

  h3 {
    margin: 1.875rem 0 1.25rem;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.25rem;
    font-size: 1rem;
    line-height: 1.65;
  }

  code {
    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New,
      monospace;
  }

  pre {
    margin: 2rem 0;
    border-radius: 0.4rem;
    padding: 1rem;
    line-height: 1.5;
  }

  // inline code
  p code,
  li code {
    background: ${({ theme }: GlobalThemeProps) => theme.background.inlineCode};
    font-size: 90%;
    border-radius: 0.4rem;
    padding: 0.2rem 0.4rem;
  }

  // quote in markdown as used in github
  pre > code {
    padding: 0 1rem;
    background: ${({ theme }: GlobalThemeProps) => theme.background.secondary};
    border-left: 0.3rem solid
      ${({ theme }: GlobalThemeProps) => theme.colors.sloganBlue};
    border-radius: 0.5rem;
    // Long quote
    // TODO: inline ele have no width, would casue overflow
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // code block. not quote in markdown. not inline code
  // TODO: w/ RWD
  .columnLeft {
    display: block;
    float: left;
    clear: both;
    width: 30%;
    padding-right: 2rem;

    @media only screen and ${mediaQueryBreakpoints.device.laptop} {
      float: none;
      width: 100%;
    }
  }
  .columnRight {
    float: left;
    clear: right;
    width: 70%;
    margin: 0;
    padding: 1px 0 0 0;
    border-top: 1px solid gray;

    @media only screen and ${mediaQueryBreakpoints.device.laptop} {
      float: none;
      width: 100%;
    }

    &::after {
      content: " ";
    }
  }
  // -- end --

  table {
    margin: 2rem 0;
    border-collapse: collapse;

    tr:nth-of-type(2n) {
      background-color: ${({ theme }: GlobalThemeProps) =>
        theme.background.secondary};
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

  a {
    position: relative;
    color: ${({ theme }: GlobalThemeProps) => theme.colors.linkBase};

    &:hover {
      text-decoration: underline
        ${({ theme }: GlobalThemeProps) => theme.colors.linkBase};
    }
  }

  ol,
  ul {
    padding-left: 2rem;
  }

  li {
    line-height: 1.6;
  }
`;

export const Info = styled.div`
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  color: ${({ theme }: GlobalThemeProps) => theme.text.secondary};
`;

export const Date = styled.time`
  margin-right: 1.2rem;
`;
