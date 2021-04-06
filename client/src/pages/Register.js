import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onClickSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <form onSubmit={onClickSubmit} className="text-gray-600 body-font">
      <div className="container px-5 lg:w-2/3 mx-auto flex flex-wrap items-center">
        <div className="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Register
          </h1>
          <p className="leading-relaxed mt-4"></p>
        </div>
        <div className="lg:w-1/2 md:w-1/2 border-l  p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg text-center font-medium title-font mb-5">
            Sign Up
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
          <div className="relative">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              value={values.email}
              onChange={onChange}
              type="email"
              name="email"
              className={errors.email ? "input-error" : "input"}
            />
            <div className="h-5">
              {errors.email && (
                <div className="text-red-600 text-md">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Password
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
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Comfirm Password
            </label>
            <input
              value={values.comfirmPassword}
              onChange={onChange}
              type="password"
              name="comfirmPassword"
              className={errors.comfirmPassword ? "input-error" : "input"}
            />
            <div className="h-5">
              {errors.comfirmPassword && (
                <div className="text-red-600 text-md">
                  {errors.comfirmPassword}
                </div>
              )}
            </div>
          </div>
          {!loading ? (
            <button type="submit" className="btn-primary">
              Submit
            </button>
          ) : (
            <button className="btn-disabled" disabled>
              Submit
            </button>
          )}

          <p className="text-xs text-gray-500 mt-3">
            Already have an account ?{" "}
            <Link to="/login" className=" underline text-blue-700">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </form>
  );
}
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $comfirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        comfirmPassword: $comfirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
