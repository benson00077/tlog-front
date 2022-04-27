import { Home } from '../containers/Home/Home';
import PageTransition from '../components/PageTransition/PageTransition';


type IndexProps = any

const Index = (props: IndexProps) => {
  return (
    <PageTransition>
      <Home />
    </PageTransition>
  )
}

export default Index
