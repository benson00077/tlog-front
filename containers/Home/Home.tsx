import { useQuery } from '@apollo/client'
import * as S from './styled'
import MetaHead from "../../components/MetaHead/MetaHead"


export function Home() {

  return (
    <>
      <MetaHead title="Home - Benson" description="My blog home page"/>


      <S.Main>
        <h1>Hi, I'm Benson</h1>
        <div>
          <p>
            This site hosts my writing and notes on web development, Korean translation and who knows what else.
          </p>
        </div>
      </S.Main>
    </>
  )
}