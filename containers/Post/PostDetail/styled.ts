import styled from 'styled-components'
import { GlobalThemeProps } from 'styled/globalStyles'
import mediaQueryBreakpoints from 'styled/mediaQueryBreakpoints'
import { flexMixin } from 'styled/mixins'
import { h2marginTop } from 'styled/position'

export const Markdown = styled.div`
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
        // background-color: ${({ theme }: GlobalThemeProps) => theme.border};
      }

      /* as thread-line-child */
      & section h3::before {
        display: block;
        content: '';
        position: absolute;
        left: -1.5rem;
        height: 20px;
        width: 20px;
        // border-left: 2px ${({ theme }: GlobalThemeProps) => theme.border} solid;
        // border-bottom: 2px ${({ theme }: GlobalThemeProps) => theme.border} solid;
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
        // border-left: 2.5px ${({ theme }: GlobalThemeProps) => theme.background.primary} solid;
        // background-color: ${({ theme }: GlobalThemeProps) => theme.background.primary};
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
  left: calc(-1.5rem - 10.4px / 2);
  // box-shadow: 0 -16px 2px 8px ${({ theme }: GlobalThemeProps) => theme.background.primary};
`
export const ThreadLineTriangle = styled.polygon`
  // fill: ${({ theme }: GlobalThemeProps) => theme.border};
`
