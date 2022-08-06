import { Footer } from './Footer/Footer'
import Header from './Header/Header'
import * as S from './styled'
import { ScrollProvider } from '../../hooks/ScrollProvider'

type LayoutProps = {
  children: React.ReactChild
}

export function Layout({ children }: LayoutProps) {
  return (
    <S.Layouts>
      <ScrollProvider>
        <>
          <Header />
          <S.Main>{children}</S.Main>
          <Footer />
        </>
      </ScrollProvider>
    </S.Layouts>
  )
}
