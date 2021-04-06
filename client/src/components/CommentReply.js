import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { DELETE_REPLY } from "../graphql/mutations";
import { LIKE_REPLY } from "../graphql/mutations";
export default function CommentReply({ reply, commentId, postId }) {
  const { user } = useContext(AuthContext);

  const [deleteReply, { loading }] = useMutation(DELETE_REPLY, {
    variables: { replyId: reply.id, commentId, postId },
    onError(error) {
      console.log(error);
    },
  });

  const [likeReply] = useMutation(LIKE_REPLY, {
    variables: { postId, commentId, replyId: reply.id },
    onError(error) {
      console.log(error);
    },
  });

  const ReplyActions = (
    <div className=" flex ">
      <div className="w-20"></div>
      <div className="">
        <div className=" cursor-pointer text-sm  font-medium pr-2 rounded">
          Respond
        </div>
      </div>
      <div className="">
        <div
          onClick={likeReply}
          className=" cursor-pointer text-sm  font-medium pr-2 rounded"
        >
          Like
        </div>
      </div>
      {user && user.username === reply.username ? (
        <div className="">
          <div
            onClick={deleteReply}
            className=" cursor-pointer text-sm  font-medium px-2 rounded"
          >
            Delete
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
  return (
    <div>
      <div className="pl-12 bg-white">
        <div className="mb flex items-start">
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
              <div className=" w-full relative">
                <div className="leading-tight px-4 bg-blue-50  mx-2 py-1 bg-white   rounded-xl  border border-l text-sm  ">
                  <span className="font-medium">{reply.username}</span>
                  <br />
                  {reply.body}.
                </div>
                {reply.likesCount !== 0 && (
                  <div
                    className="absolute  bottom-2 -right-6 flex mb-1 items-center justify-center bg-white text-blue-600   shadow rounded-xl 
                   top-auto"
                  >
                    <div className=" bg-blue-600 flex justify-center items-center h-5 w-5 rounded-full overflow-hidden">
                      <span class=" items-center flex justify-center text-sm font-bold"></span>
                    </div>
                    <span className="px-2 text-sm font-medium">
                      {reply.likesCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {user ? ReplyActions : <div className="pb-1 bg-white"></div>}
      </div>
    </div>
  );
}
