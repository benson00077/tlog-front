import Head from 'next/head'
import React from 'react'


type Props = {
  title?: string;
  description?: string;
}

function MetaHead({ title, description }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,shrink-to-fit=no"
      />
      <meta
        name="description"
        content={description}
      />

      {/* Font for 'Noto Sans TC' & 'Noto Sans KR' */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Noto+Sans+TC:wght@400;900&display=swap');
      </style>
    </Head>
  )
}

export default MetaHead