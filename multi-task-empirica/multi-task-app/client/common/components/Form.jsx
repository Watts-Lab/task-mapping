import React from "react";

export function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="not-prose space-y-8 divide-y divide-gray-200"
    >
      <div className="mb-4 space-y-8 space-y-8 divide-y divide-gray-200">
        {children}
      </div>

      {/* <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div> */}
    </form>
  );
}

export function FormSection({ children, title = null, desc = null }) {
  return (
    <div>
      <div>
        {title ? (
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        ) : (
          ""
        )}
        {desc ? <p className="mt-1 text-sm text-gray-500">{desc}</p> : ""}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {children}
      </div>
    </div>
  );
}

export function FormLabel({
  children,
  name,
  id,
  pre = null,
  post = null,
  cols = 6,
}) {
  return (
    <div
      className={`${
        cols === 2
          ? "sm:col-span-2"
          : cols === 3
          ? "sm:col-span-3"
          : "sm:col-span-6"
      }`}
    >
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      {pre ? <div className="text-sm leading-5 text-gray-500">{pre}</div> : ""}
      <div className="mt-1">{children}</div>
      {post ? <div className="mt-1 text-sm text-gray-500">{post}</div> : ""}
    </div>
  );
}
