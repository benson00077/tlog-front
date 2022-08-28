import styled from 'styled-components'
import { GlobalThemeProps } from '../../../../styled/globalStyles'
import mediaQueryBreakpoints from '../../../../styled/mediaQueryBreakpoints'
import { flexMixin } from '../../../../styled/mixins'

type styledProps = {
  theme: GlobalThemeProps['theme']
  isSelected: boolean
}

export const TagsCloud = styled.section`
  width: 50vw;
  @media only screen and ${mediaQueryBreakpoints.device.mobileL} {
    width: 90vw;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`

export const Tag = styled.span<styledProps>`
  display: inline-block;
  margin: 0 0.6rem 0.6rem 0;
  padding: 0.2rem 0.375rem;
  font-size: 1rem; //0.875rem;
  line-height: 1.6;
  color: ${(props) => (props.isSelected ? props.theme.tag.postTagSelectedColor : props.theme.tag.postTagColor)};
  background-color: ${(props) => props.theme.tag.postTagBg};
  border-radius: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.tag.postTagBgHover};
    transform: scale(1.05);
  }
`

export const TagsNavBar = styled.div<GlobalThemeProps>`
  ${flexMixin()};
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2rem 0 7rem 0;
  /* background: rgba(255,255,255,0.03); //glass */
  /* background: ${(props) => props.theme.background.tagNavBar}; */
  max-width: ${mediaQueryBreakpoints.size.laptop};

  a {
    ${flexMixin()};
    padding: 20px 10px;
    background: ${(props) => props.theme.background.tagNavBar};

    @media only screen and ${mediaQueryBreakpoints.device.laptop} {
      flex-basis: 33%;
    }
    @media only screen and ${mediaQueryBreakpoints.device.mobileL} {
      flex-basis: 50%;
    }

    &:hover {
      background: ${(props) => props.theme.background.hoveredTagNavBar};
    }

    p {
      line-height: 1.8rem;
      margin-left: 10px;
    }
  }
`
