import Link from "next/link"
import styled from "styled-components"
import { GlobalThemeProps } from "../../../styled/golbalStyles";

// styled

const STag = styled.span`
  display: inline-block;
  margin: 0 0.6rem 0.6rem 0;
  padding: 0 0.375rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }: GlobalThemeProps) => theme.colors.postTagColor};
  background-color: ${({ theme }: GlobalThemeProps) => theme.colors.postTagBg};
  border-radius: 1rem;
`

// tsx 
type props = {
  tags: string[]
}

export default function TagCloud({ tags }: props) {
  return (
    <>
      {tags.map((tag, i) => (
        <Link href={`/post?tag=${tag}`} key={i}>
          <a>
            <STag>{tag}</STag>
          </a>
        </Link>
      ))}
    </>
  )
}