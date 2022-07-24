import Link from 'next/link'
import styled from 'styled-components'
import { GlobalThemeProps } from '../../../styled/golbalStyles'

// styled

type styledProps = {
  theme: GlobalThemeProps['theme']
  isSelected: boolean
}

const STag = styled.span`
  display: inline-block;
  margin: 0 0.6rem 0.6rem 0;
  padding: 0.2rem 0.375rem;
  font-size: 1rem; //0.875rem;
  line-height: 1.6;
  color: ${(props: styledProps) =>
    props.isSelected ? props.theme.tag.postTagSelectedColor : props.theme.tag.postTagColor};
  background-color: ${(props: styledProps) => props.theme.tag.postTagBg};
  border-radius: 1rem;
  &:hover {
    background-color: ${(props: styledProps) => props.theme.tag.postTagBgHover};
    transform: scale(1.05);
  }
`

// tsx
type props = {
  tags: string[]
  targetTag?: string[] | string | undefined
}

export default function TagCloud({ tags, targetTag }: props) {
  return (
    <>
      {tags.map((tag, i) => {
        return (
          <Link href={`/post?tag=${tag}`} key={i}>
            <a>
              <STag isSelected={targetTag === tag}>{tag}</STag>
            </a>
          </Link>
        )
      })}
    </>
  )
}
