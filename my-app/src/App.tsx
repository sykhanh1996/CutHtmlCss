import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CustomTable from "./Table";
import DropDownList from "./DropdownList";

function App() {
  return (
    <div>
      <CustomTable />
      <div className="container mx-auto mt-5">
        <DropDownList />
      </div>
    </div>
  );
}

export default App;
