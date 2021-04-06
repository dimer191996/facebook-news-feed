import gql from "graphql-tag";

/**
 * Gets all available posts
 */

export const FETCH_POSTS_QUERY = gql`
  {
    posts: getPosts {
      id
      body
      username
      likesCount
      createdAt
      title
      votesCount
      isUserVoted
      votes {
        username
      }
      likes {
        username
      }
      commentsCount
      comments {
        likesCount
        id
        body
        username
        createdAt
        repliesCount
        replies {
          id
          body
          username
          createdAt
          likesCount
        }
      }
    }
  }
`;

/**
 * Gets specific post by id
 */
export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      likesCount
      createdAt
      title
      votesCount
      isUserVoted
      votes {
        username
      }
      likes {
        username
      }
      commentsCount
      comments {
        likesCount
        id
        body
        username
        createdAt
        repliesCount
        replies {
          id
          body
          username
          createdAt
          likesCount
        }
      }
    }
  }
`;
