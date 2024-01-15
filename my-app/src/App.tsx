import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CustomTable from "./Table";
import DropDownList from "./DropdownList";
import FormTable from "./FormTable";
import FloatingLabel from "./FloatingLabel";
import {
  FloatingLabelInput,
  FloatingLabelInput3,
  FloatingLabelInput4,
} from "./FloatingLabel/FloatingLabel";
import { FloatingLabelWrapper } from "./FloatingLabel/FloatingInput";
import { Form, Input } from "antd";

function App() {
  return (
    <div className="container mx-auto mt-5">
      {/* <CustomTable />
      <div className="container mx-auto mt-5">
        <DropDownList />
      </div> */}
      {/* <FormTable /> */}
      {/* <FloatingLabel /> */}
      <FloatingLabelInput label="Username2" name="username2" />
      <FloatingLabelInput3 label="Username3" name="username3" />
      <FloatingLabelInput4 label="Username4" name="username4" />
      <Form.Item name="gender" label="Gender">
        <FloatingLabelWrapper label="Username" name="username">
          <Input />
        </FloatingLabelWrapper>
      </Form.Item>
      {/* <FloatingLabelWrapper>
        <Form.Item name="gender" label="Gender">
          <Input />
        </Form.Item>
      </FloatingLabelWrapper> */}
    </div>
  );
}

export default App;
