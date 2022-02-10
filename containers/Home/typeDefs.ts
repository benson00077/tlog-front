import { gql } from "@apollo/client";

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
`;

export const GET_ALL_TAGS = gql`
  query {
    getAllTags {
      tags
    }
  }
`;