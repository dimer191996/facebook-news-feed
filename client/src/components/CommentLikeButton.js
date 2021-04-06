import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { LIKE_COMMENT } from "../graphql/mutations";
export default function CommentLikeButton({ comment, postId }) {
  const [likeComment, { loading }] = useMutation(LIKE_COMMENT, {
    variables: { postId, commentId: comment.id },
    onError(error) {
      console.log(error);
    },
  });
  return (
    <button
      onClick={likeComment}
      className="text-sm focus:outline-none  font-medium  px-1 rounded"
    >
      <span className="text-blue-600">
        <span class=" items-baseline">Like</span>
      </span>
    </button>
  );
}
