'use client'

import { Home } from 'containers/Home/Home'
import PageTransition from 'components/PageTransition/PageTransition'

const Page = () => {
  return (
    <PageTransition>
      <Home />
    </PageTransition>
  )
}

export default Page
