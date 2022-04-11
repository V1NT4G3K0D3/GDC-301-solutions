import React from "react";

import logo from "../logo.svg";
import { setPage } from "./Utils/localStorageUtils";

export default function Home() {
  return (
    <div className="flex-col flex justify-center">
      <div className="flex">
        <img className="h-48" src={logo} alt="logo" />
        <div className="flex-1 flex justify-center items-center">
          <p>Welcome to the home page</p>
        </div>
      </div>
    </div>
  );
}
