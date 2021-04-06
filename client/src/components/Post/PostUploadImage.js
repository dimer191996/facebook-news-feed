import React, { useState } from "react";

export default function PostUploadImage({ handleChange }) {
  return (
    <div>
      <div class="mb-2">
        <span className=" text-sm">Upload Photo</span>
        <div class="relative h-10 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
          <div class="absolute">
            <div class="flex flex-col items-center ">
              <span class="block text-blue-400 font-normal">Browse files</span>
            </div>
          </div>
          <input
            onChange={handleChange}
            type="file"
            accept="image/x-png,image/jpeg"
            class="h-full w-full opacity-0"
            name=""
          />
        </div>
        <div class="flex justify-between items-center text-gray-400">
          <span>Accepted file type: </span>
          <span class="flex items-center ">
            <i class="fa fa-lock mr-1"></i> secure
          </span>
        </div>
      </div>
    </div>
  );
}
