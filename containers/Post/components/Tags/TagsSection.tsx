import TagWithIcon, { iconsMap } from './TagWithIcon'
import NoScrollLink from 'components/NoScrollLink/NoScrollLink'

type props = {
  tags: string[]
  targetTag: string[] | string
  noNavBar: boolean
}

export default function TagsSection({ tags, targetTag, noNavBar }: props) {
  const tagsWithIcon = noNavBar ? [] : Object.keys(iconsMap)
  const tagsWithoutIcon = noNavBar ? tags : tags.filter((tag) => !iconsMap.hasOwnProperty(tag))

  return (
    <>
      <section className="w-1/2">
        {tagsWithoutIcon.map((tag) => (
          <NoScrollLink href={`/post?tag=${tag}`} key={tag}>
            <div key={tag} className="inline-block px-2 py-1 m-2 bg-emerald-600/30 rounded-2xl hover:scale-110">
              <span className={`${tag === targetTag ? 'text-orange-300' : 'text-neutral-200/70'}`}>{tag}</span>
            </div>
          </NoScrollLink>
        ))}
      </section>

      <section className="flex flex-row flex-wrap justify-around w-1/2 mt-8 bg-slate-600/30 mb-28">
        {tagsWithIcon.map((tag) => (
          <div key={tag} className="w-1/2 sm:w-1/3 hover:bg-slate-600/70">
            <NoScrollLink href={`/post?tag=${tag}`} key={tag}>
              <div className="flex flex-row justify-around px-2 py-4">
                <TagWithIcon tag={tag} size={30} />
                <p className="ml-2"> {tag} </p>
              </div>
            </NoScrollLink>
          </div>
        ))}
      </section>
    </>
  )
}
