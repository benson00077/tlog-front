import Link from 'next/link'
import TagWithIcon, { iconsMap } from './TagWithIcon'
import * as S from './styled'

type props = {
  tags: string[]
  targetTag?: string[] | string | undefined
}

export default function TagsSection({ tags, targetTag }: props) {
  const tagsWithIcon = Object.keys(iconsMap)
  const tagsWithoutIcon = tags.filter((tag) => !iconsMap.hasOwnProperty(tag))

  return (
    <>
      <S.TagsCloud>
        {tagsWithoutIcon.map((tag) => (
          <Link href={`/post?tag=${tag}`} key={tag}>
            <a>
              <S.Tag isSelected={targetTag === tag}>{tag}</S.Tag>
            </a>
          </Link>
        ))}
      </S.TagsCloud>

      <S.TagsNavBar>
        {tagsWithIcon.map((tag) => (
          <Link href={`/post?tag=${tag}`} key={tag}>
            <a>
              <TagWithIcon tag={tag} size={30} />
              <p> {tag} </p>
            </a>
          </Link>
        ))}
      </S.TagsNavBar>
    </>
  )
}
