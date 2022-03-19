import React, { useState } from "react";
import "../styles/input.css";
import Home from "./Home";
import Form from "./Form";

function DefaultPage() {
  const [state, setState] = useState<string>("HOME");
  const closeForm = () => {
    setState("HOME");
  };
  const openForm = () => {
    setState("FORM");
  };
  return (
    <div>
      {state === "HOME" ? (
        <Home openFormCB={openForm} />
      ) : (
        <Form closeFormCB={closeForm} />
      )}
    </div>
  );
}

export default DefaultPage;
