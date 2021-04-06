import gql from "graphql-tag";

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      comments {
        id
        body
        createdAt
        username
        likesCount
        repliesCount
        replies {
          id
          body
          likesCount
          username
          createdAt
        }
      }
      commentsCount
      id
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentsCount
      comments {
        id
      }
    }
  }
`;
export const LIKE_COMMENT = gql`
  mutation likeComment($commentId: ID!, $postId: ID!) {
    likeComment(commentId: $commentId, postId: $postId) {
      id
      comments {
        id
        likesCount
      }
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation createReply($postId: ID!, $commentId: ID!, $body: String!) {
    createReply(postId: $postId, commentId: $commentId, body: $body) {
      id
      comments {
        id
        repliesCount
        replies {
          id
          body
          likesCount
          username
          createdAt
        }
      }
    }
  }
`;
export const DELETE_REPLY = gql`
  mutation deleteReply($postId: ID!, $commentId: ID!, $replyId: ID!) {
    deleteReply(postId: $postId, commentId: $commentId, replyId: $replyId) {
      id
      comments {
        id
        repliesCount
        replies {
          id
        }
      }
    }
  }
`;
export const LIKE_REPLY = gql`
  mutation likeReply($commentId: ID!, $postId: ID!, $replyId: ID!) {
    likeReply(commentId: $commentId, postId: $postId, replyId: $replyId) {
      id
      comments {
        id
        likesCount
        replies {
          id
          likesCount
        }
      }
    }
  }
`;
