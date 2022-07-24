import { css } from 'styled-components'

export const flexMixin = (justifyContent = 'center', alignIten = 'center') => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignIten};
`
