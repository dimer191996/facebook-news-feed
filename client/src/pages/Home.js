import React from "react";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../graphql/query";

export default function Home() {
  const { loading, data: { posts } = {} } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      <section className="text-gray-600 bg-gray-100 body-font">
        <div className="container px-5 py-10 mx-auto flex flex-col">
          <div className="lg:w-4/5 mx-auto">
            {/* <div className="h-52 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="https://dummyimage.com/1200x500"
              />
            </div> */}
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="sticky top-16 ">
                  <div className="w-20 h-20  rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                      Phoebe Caulfield
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <p className="text-base">
                      Raclette knausgaard hella meggs normcore williamsburg
                      enamel pin sartorial venmo tbh hot chicken gentrify
                      portland.
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:w-2/3  sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <section className="text-gray-600 mx-6 body-font">
                  <div>
                    <div className=" font-bold h-10 text-center text-green-500">
                      {!loading ? "" : " Loading posts..."}
                    </div>
                    <div className=" grid grid-cols-1 ">
                      {!loading
                        ? posts.map((post) => (
                            <PostCard post={post} key={post.id} />
                          ))
                        : ""}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
