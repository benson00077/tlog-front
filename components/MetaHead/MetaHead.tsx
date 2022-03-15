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
    </Head>
  )
}

export default MetaHead