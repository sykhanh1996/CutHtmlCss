import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";

export default function FloatingLabel() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Username" name="username">
          <Input placeholder="Test Place holder" />
        </Form.Item>
      </Form>
    </div>
  );
}

interface FloatingLabelInputProps {
  label: string;
  name: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleBlur = (e: any) => {
    setIsFocused(false);
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={`floating-label-input ${isFocused ? "focused" : ""} ${
        value ? "filled" : ""
      }`}
    >
      <label>{label}</label>
      <Input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export const FloatingLabelInput3: React.FC<FloatingLabelInputProps> = ({
  label,
  name,
}) => {
  return (
    <div className="relative mb-5">
      <input
        id={name}
        name={name}
        type="text"
        className="peer h-10 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
        placeholder={label}
        required
      />
      <label
        htmlFor={name}
        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingLabelInput4: React.FC<FloatingLabelInputProps> = ({
  label,
  name,
}) => {
  return (
    <>
      <div className="relative mb-5">
        <Input
          id={name}
          name={name}
          className="peer h-10  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
          placeholder={label}
          required
        />
        <label
          htmlFor={name}
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:text-sm ml-3 bg-white"
        >
          {label}
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
          id="floating_outlined"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer border"
          placeholder=" "
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Floating outlined
        </label>
      </div>

      <div className="relative mb-5 mt-5">
        <Input
          id={name}
          name={name}
          className="peer h-10  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
          placeholder={label}
          required
        />
        <label
          htmlFor={name}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
        </label>
      </div>
    </>
  );
};
