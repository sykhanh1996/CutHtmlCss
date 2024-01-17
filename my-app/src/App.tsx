import { Button, DatePicker, Form, Select, TreeSelect } from "antd";
import Mypdf from "./MyPdf";
import FloatLabel, { FloatLabel2 } from "./WrapperLabel/FloatLabel";
import { useState } from "react";
import { FloatingLabelWrapper } from "./FloatingLabel/FloatingInput";

type NameFormType = {
  floatTest: any;
  alo: any;
};
function App() {
  const [firstName, setFirstName] = useState("Nikhil");
  const [lastName, setLastName] = useState("Mahirrao");
  const [treeValue, setTreeValue] = useState(["0-0-0"]);
  const [selectValue, setSelectValue] = useState();
  const [form] = Form.useForm<NameFormType>();

  const tProps = {
    treeData,
    value: treeValue,
    onChange: (e: any) => setTreeValue(e),
    treeCheckable: true,
    style: {
      width: "100%",
    },
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div className="container mx-auto mt-5">
      {/* <Mypdf /> */}

      <FloatingLabelWrapper label="First Name" name="firstName">
        <DatePicker />
      </FloatingLabelWrapper>
      <FloatLabel label="Tree Select" name="lastName" value={treeValue}>
        <TreeSelect {...tProps} />
      </FloatLabel>
      <FloatLabel label="Select Option" name="name" value={selectValue}>
        <Select
          showSearch
          style={{ width: "100%" }}
          onChange={(value) => setSelectValue(value)}
          value={selectValue}
          mode="tags"
          placeholder="Select a person"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        ></Select>
      </FloatLabel>

      <Form form={form} onFinish={onFinish}>
        <Form.Item name="floatTest">
          <FloatLabel2 label="First Name2" form={form} name="floatTest">
            <Select
              showSearch
              style={{ width: "100%" }}
              mode="tags"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
              onChange={(value) => form.setFieldsValue({ floatTest: value })}
            />
          </FloatLabel2>
        </Form.Item>

        <Form.Item name="alo">
          <FloatLabel2 label="alo" form={form} name="alo">
            <DatePicker
              onChange={(value) => form.setFieldsValue({ alo: value })}
            />
          </FloatLabel2>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={() => {
          form.submit();
        }}
      >
        test
      </Button>
    </div>
  );
}

export default App;
const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
