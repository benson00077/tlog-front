import Link from "next/link";
import { useRouter } from "next/router";
import { formatDate } from "../../../../shared/utils";
import { IPostItem } from "../../types";
import * as S from './styled'

type Props = {
  post: IPostItem
}

export default function PostCard({ post }: Props) {
  const { _id, createdAt, posterUrl, title, pv, like, tags, summary } = post

  const router = useRouter()

  const goToPost = (e: any) => {
    e.preventDefault()
    router.push(`/post/${_id}`)
  }

  return (
    <S.Box onClick={(e) => goToPost(e)}>
      <div className="imgBox">
        <img src={posterUrl} alt={title} />
      </div>
      <div className="postInfo">
        <p>{formatDate(createdAt)}</p>
        <h3>{title}</h3>
        <div>
          <span>{pv}</span>
          <span>{like}</span>
          <span>{tags}</span>
        </div>
        <S.SummaryParagraph>
          {summary}
        </S.SummaryParagraph>
      </div>
    </S.Box>
  )
}