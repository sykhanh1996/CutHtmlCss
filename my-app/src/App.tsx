import { Button, DatePicker, Form, Input, Select, TreeSelect } from "antd";
import Mypdf from "./MyPdf";
import FloatLabel, {
  FloatLabel2,
  FloatLabel3,
} from "./WrapperLabel/FloatLabel";
import { useState } from "react";
import { FloatingLabelWrapper } from "./FloatingLabel/FloatingInput";

type NameFormType = {
  floatTest: any;
  alo: any;
  alo2: any;
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
      <div className="grid grid-cols-2">
        <div>LeftMenu</div>
        {/* <Mypdf /> */}
        <Form>
          <Form.Item label="First Name">
            <div>
              <DatePicker />
            </div>
          </Form.Item>
        </Form>

        <FloatLabel2 label="test" name="test" form={form}>
          <DatePicker />
        </FloatLabel2>

        <Form.Item noStyle name="test">
          <FloatLabel3 label="testiy" placeholder="test">
            <DatePicker placeholder="" bordered={false} />
          </FloatLabel3>
        </Form.Item>
      </div>
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
