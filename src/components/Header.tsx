import { ActiveLink } from "raviger";
import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: string }) {
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
          { page: "FORMS", url: "/forms" },
        ].map((link) => {
          return (
            <ActiveLink
              key={link.url}
              href={link.url}
              className="text-gray-800 p-2 m-2 uppercase"
              exactActiveClass="text-blue-500"
            >
              {link.page}
            </ActiveLink>
          );
        })}
      </div>
    </div>
  );
}
