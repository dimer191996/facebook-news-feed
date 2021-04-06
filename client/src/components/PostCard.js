import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Count from "./Count";
import PostDeleteButton from "./PostDeleteButton";
import PostLikeButton from "./PostLikeButton";
import PostViewsCount from "./PostViewsCount";
import PostVotes from "./PostVotes";
import Comments from "./Comments";
import CommentInput from "./ReactForm";
export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  let history = useHistory();
  function deletedPostCallBack() {
    history.push("/");
  }
  return (
    <>
      <div className=" flex">
        <div className=" mr-5">
          <PostVotes
            votes={post.votesCount}
            isUserVoted={post.isUserVoted}
            postId={post.id}
          />
        </div>

        <div className="w-full">
          <div className="mt-4 bg-white rounded-t-lg shadow  pl-2 pr-8 pt-3 ">
            <div className="mb-2 flex items-start">
              <div className="flex-grow pl-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                  CATEGORY : Category
                </h2>
                <h1 className="title-font text-2xl font-medium text-gray-900 mb-3">
                  {post.title}
                </h1>
                <p className="leading-relaxed text-justify mb-5">
                  {post.body}.
                </p>
                <a className="inline-flex items-center" href="/">
                  <span className="pr-6">Author: </span>
                  <img
                    alt="blog"
                    src="https://dummyimage.com/103x103"
                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-3">
                    <span className="title-font  font-medium text-gray-900">
                      {post.username}
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div className="flex pb-1 items-baseline flex-wrap  border-gray-300 mt-auto w-full">
              <Link
                to={`/posts/` + post.id}
                className="text-indigo-500 ml-6 my-2 font-medium inline-flex items-center"
                href="/"
              >
                Read The Article
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <PostLikeButton />
              <PostViewsCount />
              <Count count={post.commentsCount} />
              {user ? (
                <PostDeleteButton
                  isTheAuther={post.username === user.username ? true : false}
                  postId={post.id}
                  callback={deletedPostCallBack}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {user ? (
            <CommentInput
              placeholder="Write your comment..."
              item="comment"
              postId={post.id}
            />
          ) : (
            <span className=" text-sm font-medium flex justify-center text-center py-2 bg-green-200">
              <span>Sign In To Participate in discutions.</span>
              <Link
                className="text-blue-600 flex hover:underline px-2"
                to="/login"
              >
                <span>Login here</span>
                <span className=" flex justify-center items-center px-2">
                  <svg
                    enableBackground="new 0 0 24 24"
                    height="22"
                    viewBox="0 0 24 24"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m22.574.433c-.187-.271-.495-.433-.824-.433h-10.75c-1.654 0-3 1.346-3 3v.779l.121.1 4 4c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.121l-4 4-.121.1v1.779c0 1.654 1.346 3 3 3h3.5c.415 0 .787-.256.934-.643l7.25-19c.118-.308.076-.654-.11-.924z"
                      fill="#2196f3"
                    />
                    <path
                      d="m19.386 10h-6.386c0 .801-.312 1.555-.879 2.121l-4 4-.121.1v1.779c0 1.654 1.346 3 3 3h3.5c.415 0 .787-.256.934-.643z"
                      fill="#1d83d4"
                    />
                    <path
                      d="m5.617 14.924c-.373-.155-.617-.52-.617-.924v-3h-4c-.552 0-1-.448-1-1s.448-1 1-1h4v-3c0-.404.244-.769.617-.924.374-.155.804-.069 1.09.217l4 4c.391.391.391 1.023 0 1.414l-4 4c-.286.286-.716.372-1.09.217z"
                      fill="#607d8b"
                    />
                    <path
                      d="m21.363.099-6.008 2.003c-.811.28-1.355 1.043-1.355 1.898v18c0 1.103.897 2 2 2 .214 0 .417-.031.637-.099l6.008-2.003c.811-.28 1.355-1.043 1.355-1.898v-18c0-1.317-1.281-2.318-2.637-1.901z"
                      fill="#64b5f6"
                    />
                    <path
                      d="m11 10h-11c0 .552.448 1 1 1h4v3c0 .404.244.769.617.924.124.051.254.076.383.076.26 0 .516-.102.707-.293l4-4c.195-.195.293-.451.293-.707z"
                      fill="#546d79"
                    />
                    <path
                      d="m14 12h10v8c0 .855-.545 1.617-1.354 1.898l-6.009 2.003c-.22.068-.423.099-.637.099-1.103 0-2-.897-2-2z"
                      fill="#579ed6"
                    />
                  </svg>
                </span>
              </Link>
            </span>
          )}
          <Comments comments={post.comments} postId={post.id} />
        </div>
      </div>
    </>
  );
}
