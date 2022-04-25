import React from "react";
import Header from "./Header";
import { User } from "./types/userTypes";

export default function AppContainer(props: {
  children: React.ReactNode;
  currentUser: User;
}) {
  return (
    <div className="flex bg-scroll items-center">
      <div className="container  p-4 w-2/5  mx-auto m-10  bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to #react-typescript with #tailwindcss"}
          currentUser={props.currentUser}
        />
        {props.children}
      </div>
    </div>
  );
}
