import React from "react";
import Comment from "./Comment";

export default function Comments({ comments, postId }) {
  return (
    <div>
      <div className="pt-2 bg-white"></div>
      <div>
        {comments.length ? (
          comments.map((comment, index) => (
            <Comment comment={comment} postId={postId} key={comment.id} />
          ))
        ) : (
          <div class=" justify-center flex z-10 bg-white rounded-b-lg">
            No Comments Yet
          </div>
        )}
      </div>
      <div className="pt-2 bg-white"></div>
    </div>
  );
}
