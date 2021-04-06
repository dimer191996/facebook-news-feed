import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="bg-white sticky top-0 z-10 opacity-75 border-b dark:bg-gray-800">
        <div className="px-6 py-3 container  mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700">
                <Link
                  className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
                  to="/"
                >
                  Brand
                </Link>
              </div>

              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 md:flex md:items-center md:justify-between">
              <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8"></div>

              <div className="flex items-center mt-4 md:mt-0">
                {!user ? (
                  <>
                    {" "}
                    <Link
                      to="/login"
                      className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex">
                      <div className=" ease-in-out duration-500 mx-6 px-2 rounded shadow hover:bg-blue-800  bg-blue-600">
                        <Link
                          className="text-xl  font-bold text-white dark:text-white md:text-xl hover:text-white dark:hover:text-gray-300"
                          to="/create_post"
                        >
                          <div>Create Post +</div>
                        </Link>
                      </div>
                      <button
                        className="hidden mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                        aria-label="show notifications"
                      >
                        <svg
                          height="16.2pt"
                          className="fill-current  hover:text-blue-600 "
                          viewBox="-20 0 512 512.00102"
                          width="17.2pt"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m426.492188 348.875h-.03125c-14.722657-.007812-23.035157-7.648438-27.792969-25.53125-4.863281-18.289062-5.027344-44.8125-5.199219-72.894531-.207031-34.023438-.441406-72.585938-8.898438-107.074219-1-4.078125-5.121093-6.574219-9.199218-5.574219-4.074219 1-6.570313 5.117188-5.574219 9.195313 8.035156 32.75 8.261719 70.363281 8.464844 103.546875.179687 29.078125.34375 56.542969 5.707031 76.707031 2.332031 8.769531 5.675781 15.976562 9.996094 21.625h-316.855469c4.320313-5.648438 7.664063-12.855469 9.996094-21.625 5.363281-20.164062 5.53125-47.628906 5.707031-76.707031.269531-44.394531.578125-94.710938 18.742188-133.21875 20.445312-43.347657 61-64.421875 123.984374-64.421875 34.589844 0 62.894532 6.5 84.125 19.324218 18.410157 11.117188 31.925782 26.917969 41.320313 48.304688 1.6875 3.84375 6.175781 5.59375 10.019531 3.902344 3.84375-1.6875 5.59375-6.171875 3.90625-10.019532-10.550781-24.015624-26.492187-42.589843-47.382812-55.207031-13.335938-8.054687-28.996094-13.863281-46.832032-17.402343-1.796874-23.347657-21.355468-41.804688-45.15625-41.804688-23.800781 0-43.363281 18.460938-45.148437 41.8125-17.015625 3.371094-32.058594 8.804688-44.96875 16.285156-20.773437 12.039063-36.796875 29.785156-47.625 52.738282-19.59375 41.542968-19.914063 93.644531-20.191406 139.613281-.171875 28.082031-.332031 54.605469-5.199219 72.894531-4.757812 17.882812-13.070312 25.523438-27.792969 25.53125h-.03125c-24.582031 0-44.582031 20-44.582031 44.585938 0 24.582031 20 44.582031 44.582031 44.582031h48.128907c4.199218 0 7.605468-3.40625 7.605468-7.605469s-3.40625-7.601562-7.605468-7.601562h-48.128907c-16.195312 0-29.375-13.179688-29.375-29.375 0-16.195313 13.175781-29.371094 29.371094-29.375h.003906.027344 381.851563.027343.007813c16.191406.003906 29.367187 13.179687 29.367187 29.375 0 16.195312-13.179687 29.375-29.375 29.375h-303.359375c-4.199218 0-7.601562 3.402343-7.601562 7.601562s3.402344 7.605469 7.601562 7.605469h31.214844c3.847656 41.421875 38.785156 73.957031 81.195312 73.957031 42.40625 0 77.34375-32.535156 81.191407-73.957031h109.761719c24.582031 0 44.582031-20 44.582031-44.582031 0-24.585938-20-44.585938-44.582031-44.585938zm-190.953126-333.667969c14.5625 0 26.742188 10.402344 29.503907 24.164063-9.335938-1.101563-19.164063-1.675782-29.503907-1.675782-10.339843 0-20.167968.570313-29.5 1.671876 2.761719-13.761719 14.9375-24.160157 29.5-24.160157zm0 481.585938c-34.015624 0-62.121093-25.734375-65.90625-58.75h131.808594c-3.785156 33.015625-31.890625 58.75-65.902344 58.75zm0 0" />
                          <path d="m357.632812 47.722656c.136719.074219 13.675782 7.800782 26.996094 25.75 17.84375 24.039063 26.886719 54.070313 26.886719 89.261719 0 4.199219 3.40625 7.605469 7.605469 7.605469 4.199218 0 7.605468-3.40625 7.605468-7.605469 0-48.445313-16.542968-80.601563-30.421874-99.042969-15.25-20.265625-30.644532-28.910156-31.292969-29.269531-3.667969-2.023437-8.269531-.695313-10.308594 2.960937-2.039063 3.660157-.722656 8.285157 2.929687 10.339844zm0 0" />
                          <path d="m415.003906 50.511719c1.222656.800781 29.96875 20.09375 29.96875 68.632812 0 4.199219 3.40625 7.601563 7.605469 7.601563s7.601563-3.402344 7.601563-7.601563c0-57.25-35.464844-80.480469-36.976563-81.441406-3.527344-2.246094-8.191406-1.207031-10.457031 2.3125-2.265625 3.515625-1.246094 8.210937 2.257812 10.496094zm0 0" />
                          <path d="m51.949219 170.339844c4.199219 0 7.605469-3.40625 7.605469-7.605469 0-35.191406 9.046874-65.222656 26.886718-89.261719 13.238282-17.835937 26.695313-25.578125 26.992188-25.75 3.660156-2.035156 4.988281-6.652344 2.960937-10.320312-2.035156-3.675782-6.660156-5.007813-10.335937-2.980469-.648438.359375-16.042969 9.003906-31.292969 29.269531-13.875 18.441406-30.417969 50.597656-30.417969 99.042969 0 4.199219 3.402344 7.605469 7.601563 7.605469zm0 0" />
                          <path d="m18.496094 126.746094c4.199218 0 7.601562-3.402344 7.601562-7.601563 0-48.5 28.703125-67.804687 29.96875-68.628906 3.515625-2.261719 4.546875-6.945313 2.300782-10.476563-2.253907-3.542968-6.953126-4.585937-10.5-2.332031-1.507813.960938-36.976563 24.1875-36.976563 81.4375 0 4.199219 3.40625 7.601563 7.605469 7.601563zm0 0" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        className=" hidden md:flex font-bold lg:flex items-center focus:outline-none"
                        aria-label="toggle profile dropdown"
                      >
                        {user.username.toUpperCase()}
                        <div className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden"></div>
                      </button>
                      <div className=" flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="absolute text-center mt-10 border-l border-r right-0 z-20 w-48 mr-14  mt-2 ">
                        <Link
                          to="/profile"
                          className="block px-3 py-1 font-medium text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white"
                        >
                          your profile
                        </Link>
                        <Link
                          onClick={logout}
                          to="/login"
                          className="block border-t font-medium px-3 py-1 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white"
                        >
                          Sign out
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}