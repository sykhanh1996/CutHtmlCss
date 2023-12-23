import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Select,
  Space,
  Tag,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { isNil } from "lodash";

interface DataType {
  key: string;
  name: string;
  type: { label: string; value: number }[];
  address: { label: string; value: number }[];
  tags: string[];
  custom: string;
  typeSelected?: number;
}

const columns = (
  handleChangeSelect: () => (value: number) => void
): ColumnsType<DataType> => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      // onCell: (record, rowIndex) => {
      //   return {
      //     onClick: (ev) => {
      //       console.log(record, rowIndex);
      //     },
      //   };
      // },
      render: (text, record, index) => (
        <>
          <Form.Item
            name={["data", "row" + index, "type"]}
            initialValue={record?.typeSelected}
          >
            <Select
              style={{ width: 120 }}
              onChange={handleChangeSelect()}
              options={record.type}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => (
        <>
          <Form.Item
            name={["data", "row" + index, "address"]}
            initialValue={record?.typeSelected}
          >
            <Select style={{ width: 120 }} options={record.address} />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <>
          {record.tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.type.length > 0 ? <>test</> : <>no record</>,
    },
    {
      title: "Custom",
      key: "custom",
      render: (_, record) => {
        if (!isNil(record?.typeSelected)) {
          switch (record.typeSelected) {
            case 1:
              return (
                <Form.Item name="custom">
                  <Checkbox defaultChecked={false} />
                </Form.Item>
              );
            default:
              return (
                <Form.Item name="custom">
                  <DatePicker />
                </Form.Item>
              );
          }
        }
        return (
          <Form.Item name="custom">
            <Input></Input>
          </Form.Item>
        );
      },
    },
  ];
};

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    type: [
      {
        label: "select 1",
        value: 1,
      },
      {
        label: "select 2",
        value: 2,
      },
    ],
    address: [
      {
        label: "address 1",
        value: 1,
      },
      {
        label: "address 2",
        value: 2,
      },
    ],
    tags: ["nice", "developer"],
    custom: "",
  },
  {
    key: "2",
    name: "Jim Green",
    type: [
      {
        label: "select 1",
        value: 1,
      },
      {
        label: "select 2",
        value: 2,
      },
    ],
    address: [
      {
        label: "address 1",
        value: 1,
      },
      {
        label: "address 2",
        value: 2,
      },
    ],
    tags: ["loser"],
    custom: "",
  },
  {
    key: "3",
    name: "Joe Black",
    type: [],
    address: [
      {
        label: "address 1",
        value: 1,
      },
      {
        label: "address 2",
        value: 2,
      },
    ],
    tags: ["cool", "teacher"],
    custom: "",
  },
];

export default function CustomTable() {
  const [testData, setTestData] = useState<DataType[]>(data);
  const handleChangeSelect = () => (value: number) => {
    // console.log(value);
    if (value == 1) {
      setTestData((prev) => {
        return prev;
      });
    }
  };

  const onFinish = (values: any) => {
    // console.log(values);
  };
  return (
    <>
      <div className="container mx-auto mt-5">
        <Form onFinish={onFinish}>
          <Table
            columns={columns(handleChangeSelect)}
            dataSource={testData}
            pagination={false}
          />
          <div className="w-full flex">
            <Button type="default" htmlType="submit" className="mt-2 m-auto">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
