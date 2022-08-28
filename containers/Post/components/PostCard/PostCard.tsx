import { useState } from 'react'
import NoScrollLink from '../../../../components/NoScrollLink/NoScrollLink'
import { formatDate } from '../../../../shared/utils'
import { IPostItem } from '../../types'
import TagWithIcon from '../Tags/TagWithIcon'
import * as S from './styled'

type Props = {
  post: IPostItem
}

export default function PostCard({ post }: Props) {
  const { _id, createdAt, posterUrl, title, pv, like, tags, summary } = post
  const [showPoster, setShowPoster] = useState(false)

  // TODO: Link and anchor tag wrap cause S.Box &:nth-of-type{} css failed
  return (
    <S.Box>
      <NoScrollLink href={`/post/${_id}`} passHref>
        <a onMouseEnter={() => setShowPoster(true)} onMouseLeave={() => setShowPoster(false)}>
          <S.postPoster showPoster={showPoster}>
            <img src={posterUrl} alt={title} />
          </S.postPoster>

          <S.postInfo>
            <span className="tag">
              <TagWithIcon tag={tags[0]} size={40} />
            </span>
            <h2>{title}</h2>
            <p className="summary">{summary.length > 40 ? summary.slice(0, 40) + '...' : summary}</p>
            <div className="secondaryInfo">
              {/* <div>
                <span>Preview: {pv}</span>
                </div>
                <div>
                <span>Likes: {like}</span>
              </div> */}
              <span className="date">{formatDate(createdAt)}</span>
            </div>
          </S.postInfo>
        </a>
      </NoScrollLink>
    </S.Box>
  )
}
