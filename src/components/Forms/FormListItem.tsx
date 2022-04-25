import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import { APIForm, FormData, FormField } from "../types/formTypes";
import { listFormFields } from "../Utils/apiUtils";

const fetchFormFields = async (formId: number) => {
  try {
    const data = await listFormFields({ offset: 0, limit: 10 }, formId);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const FormListItem = ({
  form,
  handleDeleteCB,
}: {
  form: APIForm;
  handleDeleteCB: (id: number | undefined) => void;
}) => {
  return (
    <div className="flex-col justify-between  w-2/5 m-1 border rounded-lg">
      <div className="bg-blue-500 w-auto rounded-lg p-2 flex  justify-between items-center px-3 ">
        <h3 className=" text-center text-xl  text-white font-heading ">
          {form.title}
        </h3>

        {/* <p className="text-sm text-black font-bold">Last seen</p> */}
      </div>
      <div className="text-center flex space-x-2 m-2 justify-center ">
        <Link
          className="inline-block w-16 h-8 py-1 border border-green-500 hover:bg-green-300 rounded-full text-sm text-black"
          href={"/forms/" + form.id}
        >
          Edit
        </Link>
        <button
          className="inline-block w-16 h-8 border border-red-500 hover:bg-red-300 rounded-full text-sm text-black"
          onClick={() => {
            handleDeleteCB(form.id);
          }}
        >
          Delete
        </button>
        <Link
          className="inline-block w-16 h-8 py-1 border border-blue-500 hover:bg-blue-300 rounded-full text-sm text-black"
          href={"/preview/" + form.id}
        >
          Preview
        </Link>
      </div>
    </div>
  );
};
