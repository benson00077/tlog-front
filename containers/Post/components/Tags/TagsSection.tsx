import TagWithIcon, { iconsMap } from './TagWithIcon'
import NoScrollLink from 'components/NoScrollLink/NoScrollLink'
import * as S from './styled'

type props = {
  tags: string[]
  targetTag?: string[] | string | undefined
  noNavBar: boolean
}

export default function TagsSection({ tags, targetTag, noNavBar }: props) {
  const tagsWithIcon = noNavBar ? null : Object.keys(iconsMap)
  const tagsWithoutIcon = noNavBar ? tags : tags.filter((tag) => !iconsMap.hasOwnProperty(tag))

  return (
    <>
      <S.TagsCloud>
        {tagsWithoutIcon.map((tag) => (
          <NoScrollLink href={`/post?tag=${tag}`} key={tag}>
            <div>
              <S.Tag isSelected={targetTag === tag}>{tag}</S.Tag>
            </div>
          </NoScrollLink>
        ))}
      </S.TagsCloud>

      {tagsWithIcon && (
        <S.TagsNavBar>
          {tagsWithIcon.map((tag) => (
            <NoScrollLink href={`/post?tag=${tag}`} key={tag}>
              <div>
                <TagWithIcon tag={tag} size={30} />
                <p> {tag} </p>
              </div>
            </NoScrollLink>
          ))}
        </S.TagsNavBar>
      )}
    </>
  )
}
