import { Home } from '../containers/Home/Home';
import { Layout } from '../containers/Layout/Layout';


type IndexProps = any
const Index = (props: IndexProps) => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Index
