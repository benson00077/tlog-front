import { gql } from '@apollo/client'

const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    _id
    posterUrl
    title
    summary
    content
    tags
    lastModifiedDate
    like
    pv
    isPublic
    createdAt
    updatedAt
  }
`

// TODO query shoult not have 'get' in prefix , confusing
// when receive data back (data.getPosts) -> confusing
export const POSTS = gql`
  query GetPosts($input: PaginationInput!) {
    getPosts(input: $input) {
      total
      page
      pageSize
      items {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`
