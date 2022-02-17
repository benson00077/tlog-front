import styled from "styled-components";
import { flexMixin } from "../styled/mixins";

const SRoot = styled.div`
  ${flexMixin("space-around")};
  flex-direction: column;
  min-height: 100vh;
`

export default function Custom500() {
  return (
    <SRoot>
      <h1> 500 - Server-side error occurred </h1>
    </SRoot>
  )
}
