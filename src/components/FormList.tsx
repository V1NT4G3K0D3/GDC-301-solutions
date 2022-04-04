import React, { useState } from "react";
import logo from "../logo.svg";
import { createNewForm, getLocalForms } from "./localStorageUtils";
import { FormListItem } from "./FormListItem";
import { setPage } from "./localStorageUtils";

export const FormList = (props: {
  closeFormsCB: () => void;
  openFormCB: (id: number) => void;
}) => {
  return (
    <div className="flex-col flex justify-center">
      <div className="flex ">
        <button
          className="grow w-1/2 h-12 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 mx-2 rounded-lg"
          onClick={() => {
            let form = createNewForm();
            props.openFormCB(form.id);
          }}
        >
          Create new form
        </button>
        <button
          className="grow w-1/2 h-12 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-2 mb-4 mx-2 rounded-lg"
          onClick={() => {
            props.closeFormsCB();
            setPage("HOME");
            window.location.reload();
          }}
        >
          Home
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {getLocalForms().map((form) => (
          <FormListItem
            key={form.id}
            form={form}
            openFormCB={props.openFormCB}
          />
        ))}
      </div>
    </div>
  );
};
