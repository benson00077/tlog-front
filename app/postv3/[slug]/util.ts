/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'

export interface MetaData {
  [key: string]: any
}

const postsDirectory: string = path.join(process.cwd(), 'app/postv3/(mdx)')
const fileNames: string[] = fs.readdirSync(postsDirectory)

export async function getPageData(mdxFileName: string): Promise<MetaData> {
  //ref: https://stackoverflow.com/a/43112861/16124226
  const { meta } = await import(`/app/postv3/(mdx)/${mdxFileName}`)
  const postData: MetaData = {
    meta: { ...meta, id: mdxFileName.replace(/\.mdx/, '') },
  }
  return postData
}

export async function getAllPostsMeta(): Promise<MetaData[]> {
  const metas = []
  for (const file of fileNames) {
    const { meta } = await getPageData(file)
    metas.push(meta)
  }
  metas.sort((a: MetaData, b: MetaData) => {
    return a.date < b.date ? 1 : -1
  })
  return metas
}

export function convertDate(date: string): string {
  return new Date(date).toDateString()
}
