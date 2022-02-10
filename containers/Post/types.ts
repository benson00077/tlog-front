export interface IPostItem {
  readonly _id: string
  readonly posterUrl: string
  readonly title: string
  readonly summary: string
  readonly content: string
  readonly tags: string[]
  readonly lastModifiedDate: string
  readonly like: number
  readonly pv: number
  readonly isPublic: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

export interface IPost {
  total: number
  page: number
  pageSize: number
  items: IPostItem[]
}

export interface PostQuery {
  posts: IPost
}

export interface PostVars {
  input: {
    page: number
    pageSize: number
    title?: string
    tag?: string
  }
}

export interface GetAllTagsQuery {
  getAllTags: { tags: string[] }
}