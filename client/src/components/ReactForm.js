import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COMMENT, CREATE_REPLY } from "../graphql/mutations";
import { useForm } from "../util/hooks";

export default function ReactForm({
  postId,
  commentId,
  item,
  placeholder,
  styles,
}) {
  const [errors, setErrors] = useState({});

  const { values, onEnterSubmit, onChange } = useForm(createCallBack, {
    body: "",
  });
  const mutation = commentId ? CREATE_REPLY : CREATE_COMMENT;
  const [create] = useMutation(mutation, {
    variables: { body: values.body, postId, commentId },
    update(_, result) {
      values.body = "";
      setErrors("");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createCallBack() {
    create();
  }

  return (
    <div className={(item === "reply" ? "pl-16 " : "") + "bg-white px-2 pl-6"}>
      <div className="relative">
        <div className=" flex">
          <div className="w-10 flex ">
            <img
              alt="blog"
              src="https://dummyimage.com/103x103"
              className=" h-8 rounded-full flex-shrink-0 object-cover object-center"
            />
          </div>
          <div className="w-full pl-2 leading-none">
            <TextareaAutosize
              value={values.body}
              onChange={onChange}
              onKeyPress={onEnterSubmit}
              maxRows={6}
              type="text"
              name="body"
              placeholder={placeholder}
              className={
                (item !== "comment" ? "py-2 " : "py-3 ") +
                "w-full resize-none disabled bg-gray-100 leading-tight rounded-xl border border-gray-100 focus:outline-none text-base  text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              }
            />
            <div className=" h-3 leading-none">
              {!!errors[item] && (
                <span className="text-red-600 text-sm font-medium text-md">
                  *{errors[item]}*
                </span>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
