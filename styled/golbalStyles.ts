import { createGlobalStyle } from "styled-components";
import { ThemeProps } from "./theme";

export type GlobalThemeProps = {
  theme: ThemeProps;
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html body {
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    background: ${({ theme }: GlobalThemeProps) => theme.background.primary};
    color: ${({ theme }: GlobalThemeProps) => theme.text.base}
  }

  a {
    color: ${({ theme }: GlobalThemeProps) => theme.text.secondary}
    text-decoration: none;
  }
`;