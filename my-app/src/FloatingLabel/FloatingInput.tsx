import { Input } from "antd";
import React, { ReactElement, ReactNode } from "react";

interface FloatingLabelWrapperProps {
  label: string;
  name: string;
  children: ReactNode;
}

export const FloatingLabelWrapper: React.FC<FloatingLabelWrapperProps> = ({
  label,
  name,
  children,
}) => {
  const child = React.Children.only(children) as ReactElement;

  return (
    <div className="relative mb-5 mt-5">
      {React.cloneElement(child, {
        id: name,
        name: name,
        className:
          "peer h-10 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600",
        placeholder: label,
        required: true,
      })}
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};
