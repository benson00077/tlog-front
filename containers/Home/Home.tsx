import { useQuery } from '@apollo/client'
import * as S from './styled'

export function Home() {

  return (
    <S.Main>
      <h1>Hi, I'm Benson</h1>
      <div>
        <p>
          This site hosts my writing and notes on web development, Korean translation and who knows what else.
        </p>
      </div>
    </S.Main>
  )
}