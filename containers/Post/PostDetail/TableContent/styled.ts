import styled from 'styled-components'
import { GlobalThemeProps } from '../../../../styled/globalStyles'
import mediaQueryBreakpoints from '../../../../styled/mediaQueryBreakpoints'
import { rootWidth } from '../styled'

type TocProps = {
  opacity: string
}
export const Toc = styled.div<TocProps>`
  position: absolute; // for child sticky posn
  left: calc((100% - ${rootWidth}) / 2 + ${rootWidth});
  width: calc((100% - ${rootWidth}) / 2 - 2rem);
  margin-left: 2rem;
  user-select: none;

  /** ifIsFocus */
  &:hover {
    & > div {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  div {
    opacity: ${(props) => props.opacity};
    transition: all 0.75s ease;
  }
  /** ------ */

  div {
    position: sticky;
    top: 100px;
  }

  .toc-link {
    font-size: 0.9rem;
    color: ${({ theme }: GlobalThemeProps) => theme.text.primary};
    &:hover {
      opacity: 0.6;
    }
    &::before {
      content: '';
    }
  }

  .toc-list {
    list-style-type: none;
    padding-right: 1rem;
    padding-left: 10px; // for nested .is-collapsible
    line-height: 1.6;
  }

  .is-active-link {
    color: ${({ theme }: GlobalThemeProps) => theme.text.active};
    font-weight: bold;
  }
  // NOTICE: .is-collaspsible sholudn't put under .is-collapsed
  // since they put in same tag and the effect is done by css overwrite.
  // Alternative: import 'src/styled/nprogress.css' in _app.tsx.
  .is-collapsible {
    max-height: 1000px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .is-collapsed {
    max-height: 0;
  }

  @media only screen and ${mediaQueryBreakpoints.device.laptop} {
    display: none;
  }
`
