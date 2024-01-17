import { ReactElement, useState } from "react";
import "./index.css";
import React from "react";
import { FormInstance } from "antd";

interface Props {
  label: string;
  value: string[] | undefined;
  name?: string;
  children: React.ReactNode;
}
export const FloatLabel = (props: Props) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, name } = props;

  const labelClass =
    focus || (value && value.length !== 0) ? "label label-float" : "label"; //focus : not focus

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;

interface Props2 {
  label: string;
  form: FormInstance<any>;
  name: string;
  children: React.ReactNode;
}
export const FloatLabel2 = (props: Props2) => {
  const [focus, setFocus] = useState(false);
  const { children, label, form, name } = props;
  const child = React.Children.only(children) as ReactElement;

  const value = form.getFieldValue(name);

  const labelClass =
    focus || (value && value.length !== 0)
      ? "absolute text-gray-500  duration-200 transform -translate-y-5 text-[10.5px] top-2 start-1 bg-white text-blue-500 left-2 pointer-events-none"
      : "absolute text-gray-500  duration-200 transform text-sm top-2 px-2 start-1 bg-white scale-100 -translate-y-1/2 top-1/2 text-[#00000040] pointer-events-none"; //focus : not focus

  return (
    <div
      className="relative"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {React.cloneElement(child, {
        placeholder: label,
      })}
      <label className={labelClass}>{label}</label>
    </div>
  );
};
