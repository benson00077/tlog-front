/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

interface frontMatter {
  title: string
  createdAt: Date
  updatedAt: Date
  description: string
  posterURL: string
  id: string
  tags?: string[]
  category?: string
}
export interface MetaData extends frontMatter {
  fileName: string
}

const postsDirectory: string = path.join(process.cwd(), 'app/postv3/(mdx)')
const fileNames: string[] = fs.readdirSync(postsDirectory)

export async function getPageData(mdxFileName: string): Promise<MetaData> {
  const filePath = path.resolve('./app/postv3/(mdx)', mdxFileName)
  const data = fs.readFileSync(filePath, 'utf-8')
  const { attributes, body } = fm(data)
  return { ...(attributes as frontMatter), fileName: mdxFileName.replace(/\.mdx/, '') }
}

export async function getAllPostsMeta(): Promise<MetaData[]> {
  const metas = []
  for (const file of fileNames) {
    const meta = (await getPageData(file)) as MetaData
    metas.push(meta)
  }
  metas.sort((a: MetaData, b: MetaData) => {
    return a.updatedAt < b.updatedAt ? 1 : -1
  })
  return metas
}

export function convertDate(date: string): string {
  return new Date(date).toDateString()
}
