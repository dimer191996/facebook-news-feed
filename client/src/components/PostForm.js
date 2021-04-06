import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../graphql/query";
import PostUploadImage from "./Post/PostUploadImage";

export default function PostForm() {
  const [errors, setErrors] = useState({});
  const { values, onClickSubmit, onChange } = useForm(createPostCallBack, {
    body: "",
    title: "",
  });
  const [isFocused, setIsFocused] = useState(false);

  const [image, setImage] = useState("");
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body: values.body, title: values.title, image },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      values.body = "";
      values.title = "";
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          posts: [result.data.createPost, ...data.posts],
        },
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const MAX_POST_IMAGE_SIZE = 3000000;

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size >= MAX_POST_IMAGE_SIZE) {
      alert(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`);
      return;
    }
    console.log(file);
    setImage(file);

    e.target.value = null;
  };

  function createPostCallBack() {
    createPost();
  }
  return (
    <div>
      <form
        onSubmit={onClickSubmit}
        className="text-gray-600 body-font relative"
      >
        <div className="container px-5 mx-auto">
          <div className="px-10 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="h-8">
                  {loading ? (
                    <span className="text-sm text-green-700 bold font-bold">
                      Wait... We are processiong your data
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <PostUploadImage handleChange={handlePostImageUpload} />
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    onChange={onChange}
                    value={values.title}
                    type="text"
                    id="title"
                    name="title"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <div className="h-5">
                    {errors && (
                      <span className="text-red-600 text-sm font-medium ease-in-out duration-500 text-md">
                        {errors.title}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    onChange={onChange}
                    value={values.body}
                    id="body"
                    name="body"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                  <div className="h-5">
                    {errors && (
                      <div className="text-red-600 text-sm font-medium ease-in-out duration-500 text-md">
                        {errors.body}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                {}
                <button className="flex w-full justify-center text-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $body: String!
    $title: String!
    $image: Upload
    $imagePublicId: String
  ) {
    createPost(
      body: $body
      title: $title
      image: $image
      imagePublicId: $imagePublicId
    ) {
      id
      body
      title
      image
      imagePublicId
      username
      createdAt
      votesCount
      isUserVoted
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
        replies {
          id
          username
          body
          createdAt
        }
      }
      commentsCount
      likesCount
    }
  }
`;
