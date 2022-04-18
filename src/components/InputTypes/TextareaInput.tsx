import React from "react";
import { TypeFields } from "../Utils/interfaces";

export default function LabelledInput(props: {
  field: TypeFields;
  removeFieldCB: (id: number) => void;
  editLabelCB: (id: number, value: string) => void;
  editTypeCB: (id: number, value: string) => void;
}) {
  return (
    <div>
      <div className="flex gap-2">
        <input
          className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
          type="text"
          value={props.field.label}
          onChange={(e) => props.editLabelCB(props.field.id, e.target.value)}
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
