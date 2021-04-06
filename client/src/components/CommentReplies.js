import React from "react";
import CommentReply from "./CommentReply";

export default function CommentReplies({ replies, commentId, postId }) {
  return (
    <div>
      {!replies
        ? "no replies yet"
        : replies.map((reply, index) => (
            <CommentReply
              reply={reply}
              key={reply.id}
              commentId={commentId}
              postId={postId}
            ></CommentReply>
          ))}
    </div>
  );
}
