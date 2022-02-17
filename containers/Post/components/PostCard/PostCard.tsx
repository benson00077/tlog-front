import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { formatDate } from "../../../../shared/utils";
import { IPostItem } from "../../types";
import * as S from './styled'

type Props = {
  post: IPostItem
}

export default function PostCard({ post }: Props) {
  const { _id, createdAt, posterUrl, title, pv, like, tags, summary } = post

  const router = useRouter()

  // TODO: Link and anchor tag wrap cause S.Box &:nth-of-type{} css failed
  return (
    <Link href={`/post/${_id}`} passHref>
      <a>

        <S.Box>
          <S.postPoster>
            <img src={posterUrl} alt={title} />
          </S.postPoster>

          <S.postInfo>
            <span className="date">{formatDate(createdAt)}</span>
            <h2>{title}</h2>
            <p className="summary">
              {summary}
            </p>
            <div className="secondaryInfo">
              <div>
                <span>Preview: {pv}</span>
              </div>
              <div>
                <span>Likes: {like}</span>
              </div>
              <div>
                {/* {tags.map((tag) => (
              <span>{tag}</span>
            ))} */}
                <span> {tags[0]} </span>
              </div>
            </div>
          </S.postInfo>
        </S.Box>

      </a>
    </Link>
  )
}