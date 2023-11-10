import React from 'react'
import BackToTopBtn from 'app/_components/BackToTopBtn/BackToTopBtn'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BackToTopBtn />
    </>
  )
}

export default layout
