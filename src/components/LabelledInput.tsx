import React from "react";
import { formField } from "./interfaces";

export default function LabelledInput(props: {
  field: formField;
  removeFieldCB: (id: number) => void;
  editFieldCB: (id: number, value: string) => void;
}) {
  return (
    <div>
      <label>{props.field.label}</label>
      <div className="flex gap-2">
        <input
          className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
          type={props.field.type}
          value={props.field.value}
          onChange={(e) => props.editFieldCB(props.field.id, e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          onClick={(_) => props.removeFieldCB(props.field.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
