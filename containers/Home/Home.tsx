import { useQuery } from '@apollo/client'
import { GET_ALL_TAGS } from './typeDefs'
import { IPostItem } from './types'
import * as S from './styled'

type Tags = {
  tags: string[]
}

interface getAllTagsData {
  getAllTags: Tags
}

export function Home() {

  const { data: { getAllTags: Tags } = {}, loading } = useQuery<getAllTagsData>(GET_ALL_TAGS, {
    variables: {
      input: {
        page: 1,
        pageSize: 10
      }
    }
  })

  console.log("Home container useQuery Trial : ", Tags)

  return (
    <S.Main>
      <div>
        Home Page Main Section
      </div>
      <div>
        Tags: {Tags?.tags.map((tag, i) => <div key={i}>{tag}</div>)}
      </div>
    </S.Main>
  )
}