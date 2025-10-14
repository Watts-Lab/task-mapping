import React from "react";
import { Icon } from "@blueprintjs/core";

const classNameShared =
  "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-center";

const classNamePrimary =
  "text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none";

const classNameSecondary =
  "text-sky-600 bg-white hover:bg-gray-100 active:bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed";

export function Button({
  children = "",
  onClick,
  disabled = false,
  secondary = false,
  wide = false,
  icon = null,
  rightIcon = null,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cname({ secondary, wide })}
    >
      {renderChildren({ children, icon, rightIcon })}
    </button>
  );
}

export function Submit({
  children = "",
  disabled = false,
  secondary = false,
  wide = false,
  icon = null,
  rightIcon = null,
  onClick
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={cname({ secondary, wide })}
    >
      {renderChildren({ children, icon, rightIcon })}
    </button>
  );
}

function cname({ secondary = false, wide = false }) {
  return (
    classNameShared +
    " " +
    (secondary ? classNameSecondary : classNamePrimary) +
    (wide ? " w-36" : "")
  );
}

function renderChildren({ children, icon = null, rightIcon = null }) {
  return (
    <>
      {icon ? (
        <div className="mr-1.5 flex h-1 items-center">
          <Icon icon={icon} />
        </div>
      ) : (
        ""
      )}
      {children}
      {rightIcon ? (
        <div className="ml-1.5 flex h-1 items-center">
          <Icon icon={rightIcon} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
