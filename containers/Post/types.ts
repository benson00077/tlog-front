export interface IPostItem {
  _id: string
  posterUrl: string
  title: string
  summary: string
  content: string
  tags: string[]
  lastModifiedDate: string
  like: number
  pv: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
  prev: IPostItem | null
  next: IPostItem | null
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

export interface GetPostByIdQuery {
  getPostById: IPostItem
}

export interface GetPostByIdVar {
  id: string
}