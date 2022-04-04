import React from "react";
import { formData } from "./interfaces";
import { deleteForm } from "./localStorageUtils";

export const FormListItem = (props: {
  form: formData;
  openFormCB: (id: number) => void;
}) => {
  return (
    <div className="flex-col justify-between  w-2/5 m-4 p-4 border rounded-lg">
      <div className="bg-blue-500 w-auto h-auto rounded-lg p-2 flex-col items-center px-3 ">
        <h3 className=" text-center text-xl  text-white font-bold font-heading ">
          {props.form.title}
        </h3>

        {/* <p className="text-sm text-black font-bold">Last seen</p> */}
      </div>
      <div className="text-center flex justify-center space-x-2 m-3">
        <button
          className="inline-block  py-1 w-16 border border-green-500 hover:border-green-300 rounded-full text-sm text-black"
          onClick={() => props.openFormCB(props.form.id)}
        >
          Edit
        </button>
        <button
          className="inline-block  py-1 w-16 border border-red-500 hover:border-red-300 rounded-full text-sm text-black"
          onClick={() => {
            deleteForm(props.form.id);
            window.location.reload();
          }}
        >
          Delete
        </button>
      </div>
      <h3 className=" text-center text-lg  text-black font-bold font-heading ">
        Fields
      </h3>
      <ul className="p-3 text-lg text-black mb-2">
        {props.form.formFields.map((field, index) => (
          <li className="flex items-center mb-1">
            <span className="text-xs mx-auto">{field.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
