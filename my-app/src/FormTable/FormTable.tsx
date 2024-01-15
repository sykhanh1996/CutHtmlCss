import { Button, Form, Input, InputNumber, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { name }) => (
      <>
        <Input />
      </>
    ),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    render: (_, { age }) => (
      <>
        <InputNumber />
      </>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (_, { address }) => (
      <>
        <Input />
      </>
    ),
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        <Input />
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "tesst",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: "test",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: "test",
  },
];

export default function FormTable() {
  const onCreate = (values: any) => {
    console.log(values);
  };

  const [form] = Form.useForm();
  form.setFieldsValue({ items: data });

  return (
    <div className="container mx-auto mt-5">
      <Form form={form} layout="vertical" onFinish={onCreate}>
        <Form.Item name="items">
          <Table dataSource={data} columns={columns} pagination={false} />
        </Form.Item>
      </Form>
      <Button type="default" onClick={() => form.submit()}>
        tesst
      </Button>
    </div>
  );
}
