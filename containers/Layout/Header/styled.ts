import styled from "styled-components";
import { flexMixin } from "../../../styled/mixins";
import { navHeight } from "../../../styled/position";

export const NavBar = styled.nav`
  position: fixed;
  ${flexMixin("space-between")}
  width: 100%;
  height: ${navHeight};
  padding: 0 7.5rem 0 2.4rem;
  opacity: 0.95;
  z-index: 10;
  user-select: none;
`;

export const NavBarLinks = styled.div`
  ${flexMixin("flex-start")}

  & a {
    position: relative;
    ${flexMixin()}
    font-size: 1rem;
    margin-left: 1.6rem;
  }
`;
