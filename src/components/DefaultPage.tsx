import React, { useState } from "react";
import "../styles/input.css";
import Home from "./Home";
import { Forms } from "./Forms";
import { getPage } from "./localStorageUtils";

function DefaultPage() {
  const [state, setState] = useState<string>("HOME");
  const closeForms = () => {
    setState("HOME");
  };
  const openForms = () => {
    setState("FORM");
  };
  return (
    <div>
      {getPage() === "HOME" ? (
        <Home openFormsCB={openForms} />
      ) : (
        <Forms closeFormsCB={closeForms} />
      )}
    </div>
  );
}

export default DefaultPage;
