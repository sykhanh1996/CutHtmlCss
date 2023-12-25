import { Button, Checkbox, DatePicker, Form, Input, Select, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { isNil, last } from "lodash";

type SelectType = {
  label: string;
  value: number;
};

type SelectTypeChildrens = SelectType & {
  parentId?: number;
};

type SearchContentType = {
  label?: string;
  value?: any;
  selectedType?: SelectType[];
};

type ProjectSelectedType = {
  projectSelected?: SelectType;
  detailSelected?: SelectType;
};
interface DataType {
  key: number;
  projects: SelectType[];
  details: SelectTypeChildrens[];
  modes: SelectTypeChildrens[];
  searchContent: SearchContentType;
  conditions: SelectType[];
  rowValueSelected?: ProjectSelectedType;
  disbled: boolean;
}

const columns = (
  handleChangeSelect: (rowIndex: number) => (value: number) => void,
  onDetailChange: (rowIndex: number) => (value: number) => void
): ColumnsType<DataType> => {
  return [
    {
      title: "Project",
      dataIndex: "projects",
      key: "projects",
      render: (_, record) => (
        <>
          <Form.Item name={["data", "row" + record.key, "project"]}>
            <Select
              style={{ width: 120 }}
              onChange={handleChangeSelect(record.key)}
              options={record?.projects}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text, record) => (
        <>
          <Form.Item name={["data", "row" + record.key, "details"]}>
            <Select
              style={{ width: 120 }}
              disabled={record.disbled}
              options={record?.details}
              onChange={onDetailChange(record.key)}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Modes",
      dataIndex: "modes",
      key: "modes",
      render: (text, record) => (
        <>
          <Form.Item name={["data", "row" + record.key, "modes"]}>
            <Select
              style={{ width: 120 }}
              disabled={record.disbled}
              options={record?.modes}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "SearchContent",
      key: "searchContent",
      dataIndex: "searchContent",
      render: (_, record) => {
        return (
          <>
            {record?.rowValueSelected?.detailSelected?.value === 1 ? (
              <Form.Item
                name={[
                  "data",
                  "row" + record.key,
                  "searchContents",
                  "checkbox",
                ]}
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            ) : record?.rowValueSelected?.detailSelected?.value === 2 ? (
              <Form.Item
                name={["data", "row" + record.key, "searchContents", "input"]}
              >
                <Input style={{ width: 120 }} disabled={record.disbled} />
              </Form.Item>
            ) : record?.rowValueSelected?.detailSelected?.value === 3 ? (
              <Form.Item
                name={[
                  "data",
                  "row" + record.key,
                  "searchContents",
                  "datePicker",
                ]}
              >
                <DatePicker style={{ width: 120 }} />
              </Form.Item>
            ) : record?.rowValueSelected?.detailSelected?.value === 4 ? (
              <DatePicker style={{ width: 120 }} />
            ) : (
              <Input style={{ width: 120 }} disabled={record.disbled} />
            )}
          </>
        );
      },
    },
    {
      title: "Conditions",
      dataIndex: "conditions",
      key: "conditions",
      render: (_, record) => (
        <>
          <Form.Item name={["data", "row" + record.key, "conditions"]}>
            <Select
              style={{ width: 120 }}
              disabled={record.disbled}
              options={record?.conditions}
            />
          </Form.Item>
        </>
      ),
    },
  ];
};

const projects: SelectType[] = [
  {
    label: "Select 1",
    value: 1,
  },
  {
    label: "Select 2",
    value: 2,
  },
];

const details: SelectTypeChildrens[] = [
  {
    label: "check box type",
    value: 1,
    parentId: 1,
  },
  {
    label: "input",
    value: 2,
    parentId: 1,
  },
  {
    label: "date time",
    value: 3,
    parentId: 2,
  },
];
const modes: SelectTypeChildrens[] = [
  {
    label: "mode 1",
    value: 1,
    parentId: 1,
  },
  {
    label: " mode 2",
    value: 2,
    parentId: 1,
  },
  {
    label: "mode 3",
    value: 3,
    parentId: 2,
  },
  {
    label: "mode 4",
    value: 4,
    parentId: 2,
  },
];

const searchContent: SearchContentType = {};

const conditions: SelectType[] = [
  {
    label: "AND",
    value: 1,
  },
  {
    label: "OR",
    value: 2,
  },
];

const data: DataType[] = Array(3)
  .fill(0)
  .map((item, index) => {
    return {
      key: index,
      projects: projects,
      details: details,
      modes: modes,
      searchContent: searchContent,
      conditions: conditions,
      disbled: true,
    };
  });

export default function CustomTable() {
  const [testData, setTestData] = useState<DataType[]>(data);
  const [form] = Form.useForm();
  const onProjectChange = (rowIndex: number) => (value: number) => {
    const rowChange = data.find((x) => x.key === rowIndex);
    if (rowChange) {
      const project = rowChange.projects.find(
        (x) => x.value === value
      ) as SelectType;
      const details = rowChange.details.filter((x) => x.parentId === value);
      const modes = rowChange.modes.filter((x) => x.parentId === value);
      const rowValueSelected: ProjectSelectedType = {
        projectSelected: project,
        detailSelected: details && details[0],
      };
      setTestData((prev) => {
        return prev.map((item) => {
          if (item.key === rowIndex) {
            return {
              ...item,
              details: details,
              modes: modes,
              rowValueSelected: rowValueSelected,
              disbled: false,
            };
          }
          return item;
        });
      });

      form.setFieldValue(
        ["data", `row${rowIndex}`, "details"],
        details[0].value
      );
      form.setFieldValue(["data", `row${rowIndex}`, "modes"], modes[0].value);
      form.setFieldValue(
        ["data", `row${rowIndex}`, "conditions"],
        rowChange.conditions[0].value
      );
    }
  };

  const onDetailChange = (rowIndex: number) => (detailValue: number) => {
    const rowChange = testData.find((x) => x.key === rowIndex);
    if (rowChange) {
      const detail = rowChange.details.find(
        (x) => x.value === detailValue
      ) as SelectType;

      setTestData((prev) => {
        return prev.map((item) => {
          if (item.key === rowIndex) {
            return {
              ...item,
              rowValueSelected: {
                projectSelected: item.rowValueSelected?.projectSelected,
                detailSelected: detail,
              },
            };
          }
          return item;
        });
      });
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <div className="container mx-auto mt-5">
        <Form onFinish={onFinish} form={form}>
          <Table
            columns={columns(onProjectChange, onDetailChange)}
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
