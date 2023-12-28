import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Input,
  InputProps,
  InputRef,
  Select,
  SelectProps,
  Space,
} from "antd";
import type { DefaultOptionType } from "antd/es/select";
import React, { useRef, useState } from "react";

interface Props {
  initialValue?: string[];
  inputProps?: React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<InputRef>
  >;
  selectProps?: SelectProps<any, DefaultOptionType>;
}

export default function DropDownList(props: Props) {
  const { initialValue = [], inputProps, selectProps } = props;

  const [items, setItems] = useState(initialValue);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  let index = useRef<number>(0);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index.current++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Select
      className="w-80"
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider className="my-2 mx-0" />
          <Space className="p-0 pt-2 pr-1">
            <Input
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
              {...inputProps}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
      {...selectProps}
    />
  );
}
