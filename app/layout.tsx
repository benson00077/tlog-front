import './globals.css'
import { Footer } from 'containers/Layout/Footer/Footer'
import Header from 'containers/Layout/Header/Header'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <title>Home - Benson</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,shrink-to-fit=no" />
      <meta name="description" content="My blog home page" />
      <body>
        <Header />
        <main className="pt-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default layout
