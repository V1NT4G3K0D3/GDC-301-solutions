import { ActiveLink } from "raviger";
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  createRef,
  RefObject,
} from "react";
import logo from "../logo.svg";
import { User } from "./types/userTypes";

const useKeyPress = function (
  targetKey: string,
  ref: RefObject<HTMLInputElement>
) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    ref.current?.addEventListener("keydown", downHandler);
    ref.current?.addEventListener("keyup", upHandler);

    return () => {
      ref.current?.removeEventListener("keydown", downHandler);
      ref.current?.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default function Header(props: { title: string; currentUser: User }) {
  return (
    <div className="flex justify-between gap-2 items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        style={{ animation: "spin 2s linear infinite" }}
        alt="logo"
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "HOME", url: "/" },
          { page: "ABOUT", url: "/about" },
          ...(props.currentUser?.username?.length > 0
            ? [
                {
                  page: "LOGOUT",
                  onclick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ page: "LOGIN", url: "/login" }]),
        ].map((link) => {
          return link.url ? (
            <ActiveLink
              key={link.page}
              href={link.url}
              className="text-gray-800 p-2 m-2 uppercase"
              exactActiveClass="text-blue-500"
            >
              {link.page}
            </ActiveLink>
          ) : (
            <button
              key={link.page}
              className="text-gray-800 p-2 m-2 uppercase"
              onClick={link.onclick}
            >
              {link.page}
            </button>
          );
        })}
        <ActiveLink
          href={"/forms"}
          className="text-gray-800 p-2 m-2 uppercase"
          activeClass="text-blue-500"
        >
          FORM
        </ActiveLink>
      </div>
    </div>
  );
}
