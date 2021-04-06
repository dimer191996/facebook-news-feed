import gql from "graphql-tag";
import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";

import { AuthContext } from "../context/auth";

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onClickSubmit, values } = useForm(loginUser, {
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUser() {
    login();
  }

  return (
    <form onSubmit={onClickSubmit} className="text-gray-600 body-font">
      <div className="container px-5 lg:w-2/3  mx-auto flex flex-wrap items-center">
        <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Register
          </h1>
          <p className="leading-relaxed mt-4"></p>
        </div>
        <div className="lg:w-1/2 md:w-1/2 border-l  p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg text-center font-medium title-font mb-5">
            LOGIN
            <div className="h-8">
              {" "}
              {loading ? (
                <span className="text-sm text-green-700 bold font-bold">
                  Wait... We are processiong your data
                </span>
              ) : (
                ""
              )}{" "}
            </div>
          </h2>
          <div className="h-5 text-center">
            <div className="text-red-600 font-bold text-md">
              {errors.general}
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              Username
            </label>
            <input
              value={values.username}
              onChange={onChange}
              type="text"
              name="username"
              className={errors.username ? "input-error" : "input"}
            />
            <div className="h-5">
              {errors.username && (
                <div className="text-red-600 text-md">{errors.username}</div>
              )}
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              password
            </label>
            <input
              value={values.password}
              onChange={onChange}
              type="password"
              name="password"
              className={errors.password ? "input-error" : "input"}
            />
            <div className="h-5">
              {errors.password && (
                <div className="text-red-600 text-md">{errors.password}</div>
              )}
            </div>
          </div>
          {!loading ? (
            <button type="submit" className="btn-primary">
              Login
            </button>
          ) : (
            <button className="btn-disabled" disabled>
              ...
            </button>
          )}

          <p className="text-xs text-gray-500 mt-3">
            Don't have an account ?{" "}
            <Link to="/register" className=" underline text-blue-700">
              Register here
            </Link>{" "}
          </p>
        </div>
      </div>
    </form>
  );
}
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      createdAt
      token
    }
  }
`;
