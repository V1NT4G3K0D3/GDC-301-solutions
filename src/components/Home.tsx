import React from "react";

import logo from "../logo.svg";
import { setPage } from "./localStorageUtils";

function Home(props: { openFormsCB: () => void }) {
  return (
    <div className="flex-col flex justify-center">
      <div className="flex">
        <img className="h-48" src={logo} alt="logo" />
        <div className="flex-1 flex justify-center items-center">
          <p>Welcome to the home page</p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
        onClick={() => {
          props.openFormsCB();
          setPage("FORM");
        }}
      >
        Open Forms
      </button>
    </div>
  );
}

export default Home;
