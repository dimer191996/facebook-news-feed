import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COMMENT } from "../graphql/mutations";
export default function CommentDeleteButton({ comment, postId }) {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { postId, commentId: comment.id },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <button
      onClick={deleteComment}
      className="text-sm focus:outline-none  font-medium px-2 rounded"
    >
      Delete
    </button>
  );
}
