import React, { useContext, useState } from "react";
import CommentReplies from "./CommentReplies";
import { AuthContext } from "../context/auth";
import CommentLikeButton from "./CommentLikeButton";
import CommentDeleteButton from "./CommentDeleteButton";
import ReplyForm from "./ReactForm";
export default function Comments({ comment, postId }) {
  const { user } = useContext(AuthContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  function countItemsView(count) {
    const view = (
      <div className="w-auto flex flex-wrap">
        <div className="flex items-center justify-center bg-white text-blue-600  shadow rounded-xl top-auto">
          <div className=" bg-blue-600 flex justify-center items-center h-5 w-5 rounded-full overflow-hidden">
            <span class=" items-center flex justify-center text-sm font-bold"></span>
          </div>
          <span className="px-2 text-sm font-medium">{count}</span>
        </div>
      </div>
    );
    if (count !== 0) {
      return view;
    }
  }
  const replyForm = user && (
    <ReplyForm
      item="reply"
      placeholder="Write your reply..."
      styles={{ marginLeft: "ml-8", marginBottom: "mb-1" }}
      commentId={comment.id}
      postId={postId}
    />
  );
  const replies = (
    <CommentReplies
      replies={comment.replies}
      commentId={comment.id}
      postId={postId}
    />
  );
  return (
    <div>
      <div className=" bg-white">
        <div className="flex items-start">
          <div className="flex-shrink-0 flex flex-col justify-center text-center leading-none"></div>
          <div>
            <div className="flex ml-6">
              <div className="w-10 flex ">
                <img
                  alt="blog"
                  src="https://dummyimage.com/103x103"
                  className=" h-8 rounded-full flex-shrink-0 object-cover object-center"
                />
              </div>
              <div className=" w-full relative ">
                <div className="leading-tight px-4  bg-gray-100  mx-2 py-1 bg-white   rounded-xl  border border-l  ">
                  {comment.username}
                  <br />
                  <span style={{ fontSize: "14.5px" }}>{comment.body}.</span>
                </div>
                <div className="mb-1"></div>
                <div>
                  <div className="absolute w-12  -bottom-0 -right-6 ">
                    {countItemsView(comment.likesCount)}
                    <div className="mb-1"></div>
                    {countItemsView(comment.repliesCount)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex relative ">
          <div className="w-16"></div>
          <div className=" flex mb-1">
            {user && (
              <button
                onClick={() => setShowReplyForm(true)}
                className="text-sm  focus:outline-none  font-medium pl-4 pr-2 rounded"
              >
                Reply
              </button>
            )}

            {user && <CommentLikeButton comment={comment} postId={postId} />}
            {user &&
              (user.username === comment.username ? (
                <CommentDeleteButton comment={comment} postId={postId} />
              ) : (
                ""
              ))}
          </div>
        </div>
      </div>
      {showReplyForm && replyForm}
      {replies}
    </div>
  );
}
