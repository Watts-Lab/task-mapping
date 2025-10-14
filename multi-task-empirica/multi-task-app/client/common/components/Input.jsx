import React from "react";

export function Input({
  name,
  value,
  onChange,
  required = false,
  autoComplete = "off",
  placeholder = "",
}) {
  return (
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className="focus:ring-sky-500 focus:border-sky-500 block w-full max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm"
    />
  );
}

export function Textarea({
  name,
  value,
  onChange,
  required = false,
  rows = 3,
  autoComplete = "off",
}) {
  return (
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      rows={rows}
      className="focus:ring-sky-500 focus:border-sky-500 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
    ></textarea>
  );
}

export function Select({ name, value, onChange, options = [] }) {
  return (
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="focus:outline-none focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base sm:text-sm"
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label || value}
        </option>
      ))}
    </select>
  );
}

export function RadioGroup({ name, value, onChange, options = [], required = false }) {
  return (
    <fieldset className="mt-3">
      {/* <legend className="sr-only">Notification method</legend> */}
      <div className="space-y-4">
        {options.map(({ label, value: val }) => (
          <div key={val.toString()} className="flex items-center">
            <input
              id={val.toString()}
              value={val}
              name={name}
              checked={value === val}
              required={required}
              type="radio"
              className="focus:ring-sky-500 text-sky-600 h-4 w-4 border-gray-300"
              onChange={onChange}
            />
            <label
              htmlFor={val.toString()}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {label || val}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}