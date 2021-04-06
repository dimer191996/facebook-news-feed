import React, { useContext } from "react";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";
export default function PostVotes({ postId, votes, isUserVoted }) {
  const { user } = useContext(AuthContext);
  const isVoted = JSON.parse(isUserVoted.toLowerCase());
  const [votePost] = useMutation(VOTE_POST, {
    variables: { postId },
  });
  return (
    <div className=" sticky top-16">
      <div className="w-12 mt-6 flex-shrink-0 flex flex-col text-center leading-none">
        <div className="text-gray-500 flex flex-col justify-center border-gray-200">
          <span
            onClick={isVoted !== null ? votePost : null}
            className={
              (isVoted ? "text-blue-600" : " disabled") +
              " fill-current  cursor-pointer"
            }
          >
            <svg
              id="Capa_1"
              enableBackground="new 0 0 512 512"
              height="41"
              className=" hover:shadow-xl  "
              viewBox="0 0 512 512"
              width="41"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <g fill="#8ac9fe">
                    <path d="m125.529 438.441c.153-1.196-.778-2.254-1.984-2.254h-30.257c-1.272 0-2.221-1.172-1.956-2.416l17.068-80.218c-28.768 8.884-49.671 35.684-49.671 67.369 0 35.404 26.1 64.705 60.106 69.731z" />
                    <path d="m148.12 353.003-11.15 44.7c-.315 1.262.64 2.484 1.941 2.484h29.697c1.481 0 2.448 1.553 1.795 2.882l-43.374 88.297c.733.023 1.463.056 2.201.056 38.936 0 70.5-31.564 70.5-70.5-.001-32.39-21.852-59.659-51.61-67.919z" />
                  </g>
                  <g>
                    <path
                      d="m120.268 479.48c-18.854-12.649-31.268-34.147-31.268-58.558 0-15.842 5.228-30.459 14.051-42.227l5.349-25.142c-28.768 8.884-49.671 35.684-49.671 67.369 0 35.404 26.1 64.705 60.106 69.731z"
                      fill="#8ac9fe"
                    />
                  </g>
                  <g>
                    <path
                      d="m168.607 400.187h-29.697c-1.301 0-2.255-1.222-1.941-2.484l13.229-53.032c.315-1.262-.64-2.484-1.941-2.484h-35.821c-.944 0-1.76.66-1.956 1.584l-19.149 90c-.265 1.244.684 2.416 1.956 2.416h30.257c1.206 0 2.137 1.059 1.984 2.254l-8.179 63.799c-.287 2.242 2.782 3.165 3.779 1.136l49.274-100.307c.653-1.329-.314-2.882-1.795-2.882z"
                      fill="#fed402"
                    />
                  </g>
                  <g>
                    <g>
                      <path
                        d="m112.044 433.771 19.149-90c.196-.923 1.012-1.584 1.956-1.584h-20.712c-.944 0-1.76.66-1.956 1.584l-19.149 90c-.265 1.244.684 2.416 1.956 2.416h20.712c-1.272 0-2.221-1.172-1.956-2.416z"
                        fill="#fac600"
                      />
                    </g>
                  </g>
                </g>
                <g>
                  <path d="m123.49 151.287 11.706-11.706v143.654c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-143.654l11.706 11.706c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197c2.929-2.929 2.929-7.678 0-10.606l-24.509-24.509c-2.929-2.929-7.678-2.929-10.606 0l-24.509 24.509c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.928 7.677 2.928 10.606 0z" />
                  <path d="m458.575 140.68-24.51-24.509c-2.93-2.929-7.678-2.929-10.607 0l-24.51 24.509c-2.929 2.929-2.929 7.678 0 10.606s7.677 2.93 10.607 0l11.706-11.706v143.654c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-143.653l11.706 11.706c1.465 1.464 3.385 2.197 5.304 2.197s3.839-.732 5.304-2.197c2.929-2.929 2.929-7.678 0-10.607z" />
                  <path d="m394.762 395.363h-58.821v-8.088c9.44-6.793 16.795-16.31 20.896-27.394h13.728c14.282 0 25.901-11.619 25.901-25.901v-15.23c0-5.691-1.849-10.955-4.972-15.234v-43.706c0-38.491-27.654-70.629-64.134-77.631v-14.179c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v12.747h-53.265v-68.19c0-5.79-4.711-10.5-10.5-10.5h-27.732l64.866-71.861 64.865 71.861h-27.733c-5.79 0-10.5 4.71-10.5 10.5v20.443c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-15.943h33.357c4.146 0 7.912-2.448 9.595-6.235 1.684-3.788.977-8.224-1.801-11.3l-74.989-83.077c-1.987-2.202-4.828-3.464-7.794-3.464-2.967 0-5.808 1.263-7.795 3.464l-74.989 83.076c-2.778 3.077-3.485 7.513-1.801 11.3 1.683 3.788 5.45 6.236 9.595 6.236h33.357v65.123c-36.479 7.003-64.133 39.14-64.133 77.631v43.707c-3.122 4.278-4.971 9.543-4.971 15.233v15.229c0 14.282 11.619 25.901 25.901 25.901h13.728c4.101 11.085 11.456 20.601 20.896 27.395v8.088h-32.607c-7.557-21.698-24.442-39.061-45.836-47.267l.402-1.61c.713-2.857.082-5.827-1.73-8.148-1.813-2.321-4.542-3.652-7.487-3.652h-35.821c-4.458 0-8.365 3.164-9.292 7.522l-1.205 5.663c-29.587 11.088-50.712 39.639-50.712 73.049 0 36.556 25.284 67.301 59.279 75.709l-.597 4.655c-.594 4.628 2.218 8.962 6.687 10.306.917.275 1.844.408 2.757.408 3.541 0 6.87-1.987 8.505-5.317l3.843-7.824c3.25-.102 6.443-.426 9.582-.916.563 7.843 7.108 14.057 15.092 14.057h258.704c8.353 0 15.147-6.795 15.147-15.147v-17.852c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v17.853c0 .082-.066.147-.147.147h-121.853v-72.235l24.763 19.664c2.009 1.596 4.422 2.415 6.863 2.415 1.636 0 3.283-.367 4.831-1.114 3.858-1.863 6.256-5.682 6.256-9.966v-25.4h58.821c11.285 0 20.466 9.181 20.466 20.465v13.171c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-13.172c0-19.555-15.91-35.465-35.466-35.465zm-13.296-76.613v15.229c0 6.011-4.891 10.901-10.901 10.901h-10.352c.159-1.758.253-3.534.253-5.333v-31.699h10.099c6.011.001 10.901 4.891 10.901 10.902zm-180.574 26.131c-6.011 0-10.901-4.89-10.901-10.901v-15.23c0-6.011 4.89-10.901 10.901-10.901h10.099v31.699c0 1.798.094 3.575.253 5.333zm10.099-53.548v1.516h-10.099c-2.041 0-4.024.245-5.93.693v-33.731c0-35.325 28.739-64.064 64.063-64.064h53.405c35.325 0 64.063 28.739 64.063 64.064v33.731c-1.906-.448-3.889-.693-5.93-.693h-10.099v-15.498c0-13.181-8.934-24.57-21.725-27.695-4.155-1.015-8.681-.647-12.739 1.036l-43.293 17.954c-1.929.8-3.966 1.206-6.054 1.206h-44.183c-11.842-.001-21.479 9.636-21.479 21.481zm-98.56 190.297c-26.607-7.371-46.202-31.787-46.202-60.708 0-23.395 12.825-43.84 31.808-54.703l-14.04 65.988c-.6 2.817.095 5.717 1.907 7.956s4.504 3.523 7.384 3.523h24.007zm27.034 1.427 11.655-23.726c1.827-3.718.293-8.212-3.425-10.038-3.716-1.827-8.212-.294-10.038 3.425l-8.656 17.622 3.967-30.944c.347-2.707-.488-5.435-2.291-7.484s-4.402-3.224-7.132-3.224h-23.463l16.809-79h24.327l-11.525 46.203c-.712 2.857-.081 5.827 1.732 8.147s4.542 3.65 7.486 3.65h20.867l-6.654 13.546c-1.827 3.718-.293 8.212 3.425 10.038 3.717 1.828 8.212.293 10.038-3.425l10.547-21.47c1.457-2.964 1.283-6.408-.463-9.211s-4.761-4.478-8.064-4.478h-22.657l7.463-29.915c22.768 9.501 38.816 31.979 38.816 58.15 0 31.249-22.88 57.23-52.764 62.134zm138.763 13.943h-121.851c-.081 0-.147-.066-.147-.147v-2.795c29.736-11.006 50.999-39.618 50.999-73.135 0-3.582-.257-7.104-.727-10.559h29.015v25.4c0 4.285 2.397 8.103 6.255 9.966s8.339 1.364 11.693-1.299l24.763-19.663zm42.713-69.382-26.968-21.415c-2.428-1.928-5.336-2.892-8.245-2.892-2.908 0-5.816.964-8.243 2.891l-26.968 21.415v-32.547c6.033 2.097 12.505 3.247 19.243 3.247h31.938c6.738 0 13.21-1.15 19.243-3.247zm-19.243-44.301h-31.938c-24.134 0-43.769-19.634-43.769-43.769v-48.215c0-3.574 2.908-6.482 6.482-6.482h44.183c4.07 0 8.04-.791 11.8-2.35l43.293-17.954c1.134-.47 2.352-.584 3.432-.32 6.057 1.479 10.286 6.876 10.286 13.124v62.197c-.001 24.135-19.635 43.769-43.769 43.769z" />
                  <path d="m303.191 337.859c-4.143 0-7.5 3.358-7.5 7.5 0 4.387-4.47 7.957-9.963 7.957s-9.962-3.569-9.962-7.957c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5c0 12.658 11.198 22.957 24.962 22.957 13.765 0 24.963-10.298 24.963-22.957 0-4.142-3.357-7.5-7.5-7.5z" />
                  <path d="m267.849 313.434v-7.416c0-4.142-3.357-7.5-7.5-7.5-4.142 0-7.5 3.358-7.5 7.5v7.416c0 4.142 3.358 7.5 7.5 7.5 4.143 0 7.5-3.358 7.5-7.5z" />
                  <path d="m311.108 298.518c-4.143 0-7.5 3.358-7.5 7.5v7.416c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-7.416c0-4.143-3.357-7.5-7.5-7.5z" />
                  <path d="m162.667 37.313 11.706-11.706v50.969c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-50.97l11.706 11.706c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197c2.929-2.929 2.929-7.678 0-10.606l-24.509-24.509c-2.929-2.929-7.678-2.929-10.606 0l-24.509 24.509c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.929 7.677 2.929 10.606.001z" />
                  <path d="m370.379 37.313 11.705-11.706v50.968c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-50.969l11.706 11.706c1.465 1.464 3.385 2.197 5.304 2.197s3.839-.732 5.304-2.197c2.929-2.929 2.929-7.678 0-10.606l-24.51-24.509c-1.408-1.407-3.315-2.197-5.304-2.197s-3.896.79-5.304 2.197l-24.509 24.509c-2.929 2.929-2.929 7.678 0 10.606 2.93 2.929 7.678 2.929 10.608.001z" />
                </g>
              </g>
            </svg>
          </span>

          <span className=" font-bold  bg-gray-200 border-gray-300  border-b-2 border-t-2 mt-1">
            {votes}
          </span>
        </div>
        <div>
          {/* <span className="font-medium flex justify-center cursor-pointer text-lg text-gray-800 title-font leading-none">
            <svg
              height="20"
              viewBox="0 0 64 64"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icons">
                <g>
                  <g>
                    <path
                      d="m14.01 32.077h35.986c1.649 0 2.59 1.884 1.598 3.202l-17.992 23.923c-.8 1.064-2.397 1.064-3.197 0l-17.993-23.923c-.992-1.318-.051-3.202 1.598-3.202z"
                      fill="#0593fc"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </span> */}
        </div>
      </div>
    </div>
  );
}
const VOTE_POST = gql`
  mutation votePost($postId: ID!) {
    votePost(postId: $postId) {
      id
      votesCount
      isUserVoted
    }
  }
`;
