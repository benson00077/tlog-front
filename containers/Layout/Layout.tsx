import { Footer } from "./Footer/Footer";
import Header from "./Header/Header";
import * as S from './styled'

type LayoutProps = {
  title?: string
  children: React.ReactChild
}

export function Layout({title, children}: LayoutProps) {
  

  return (
    <S.Layouts>
      <Header />
      <S.Main>{children}</S.Main>
      <Footer/>
    </S.Layouts>
  )
}

