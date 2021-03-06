import { gql } from '@apollo/client'

const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    _id
    posterUrl
    title
    summary
    tags
    lastModifiedDate
    like
    pv
    isPublic
    createdAt
    updatedAt
  }
`

// get public posts
export const POSTS = gql`
  query Posts($input: PaginationInput!) {
    posts(input: $input) {
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

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    getPostById(id: $id) {
      content
      ...PostFragment
      prev {
        _id
        posterUrl
        title
      }

      next {
        _id
        posterUrl
        title
      }
    }
  }
  ${POST_FRAGMENT}
`

export const GET_TOP_PV_POSTS = gql`
  query GetTopPVPosts($limit: Int!) {
    getTopPVPosts(limit: $limit) {
      _id
      title
      posterUrl
    }
  }
`

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      tags
    }
  }
`

export const UPDATE_LIKE = gql`
  mutation UpdateLike($id: ID!) {
    updateLike(id: $id) {
      _id
      like
    }
  }
`

export const UPDATE_PV = gql`
  mutation UpdatePV($id: ID!) {
    updatePV(id: $id) {
      _id
      pv
    }
  }
`
