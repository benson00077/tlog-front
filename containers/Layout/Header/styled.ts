import styled from "styled-components";
import { flexMixin } from "../../../styled/mixins";

export const NavBar = styled.nav`
  position: fixed;
  ${flexMixin("space-between")}
  width: 100%;
  height: 2.5rem;
  padding: 0 7.5rem 0 2.4rem;
  opacity: 0.95;
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
