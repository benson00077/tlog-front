import styled from 'styled-components'
import mediaQueryBreakpoints from 'styled/mediaQueryBreakpoints'
import { flexMixin } from 'styled/mixins'

type ButtonProps = {
  isDisplay: boolean
}

export const Button = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  cursor: pointer;
  width: 4rem;
  /* height: 4rem; */
  height: ${(props: ButtonProps) => (props.isDisplay ? '4rem' : '0')};
  opacity: ${(props: ButtonProps) => (props.isDisplay ? 0.5 : 0)};
  transition: all 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.5);
  ${flexMixin()};
  user-select: none;
  border-radius: 50%;

  &:hover {
    transform: scale(1.1) translate(-0.5rem, -0.5rem);
  }

  @media only screen and ${mediaQueryBreakpoints.device.laptop} {
    display: none;
  }

  p {
    height: inherit;
    text-align: center;
    font-size: 2.5rem;
    position: relative;
    top: -3px;
  }
`
