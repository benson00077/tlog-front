import styled from "styled-components";
import { GlobalThemeProps } from "../../styled/golbalStyles";

export const Container = styled.div`
  position: fixed;
  top: 0.75rem;
  right: 2.4rem;
  z-index: 100;

  .switch {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 1.5rem;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background.secondary};
    -webkit-transition: 0.2s;
    transition: 0.2s;
    box-shadow: 0 0 2px ${({ theme }: GlobalThemeProps) => theme.text.base};
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 7px;
    bottom: 5px;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background.tooltip};
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }

  input:checked + .slider {
    background-color: ${({theme}: GlobalThemeProps) => theme.background.secondary};
  }

  input:checked + .slider:before {
    -webkit-transform: translateY(35px);
    -ms-transform: translateX(35px);
    transform: translateX(35px);
  } 

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export const Icons = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 25%;
  align-items: center;

  /* svg {
    color: ${({ theme }) => theme.text};
    z-index: 11;
  } */
`;