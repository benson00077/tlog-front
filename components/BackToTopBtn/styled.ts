import styled from "styled-components";
import mediaQueryBreakpoints from "../../styled/mediaQueryBreakpoints";
import { flexMixin } from "../../styled/mixins";

type ButtonProps = {
  isDisplay: Boolean;
};

export const Button = styled.div`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  opacity: ${(props: ButtonProps) => (props.isDisplay ? 0.5 : 0)};
  transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.5);
  ${flexMixin()};
  user-select: none;

  @media only screen and ${mediaQueryBreakpoints.device.laptop} {
    display: none;
  }


  p {
    text-align: center;
    font-size: 2.5rem;
    position: relative;
    top: -3px;
  }
`;
