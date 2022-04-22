import React from "react";
import { FormStateActionSubset } from "../Forms/Form";
import { TypeFields } from "../Utils/interfaces";

export default function LabelledInput(props: {
  field: TypeFields;
  dispatchActionCB: (action: FormStateActionSubset) => void;
}) {
  return (
    <div>
      <div className="flex gap-2">
        <input
          className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
          type="text"
          value={props.field.label}
          onChange={(e) =>
            props.dispatchActionCB({
              type: "edit_label",
              id: props.field.id,
              label: e.target.value,
            })
          }
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          onClick={(_) =>
            props.dispatchActionCB({ type: "remove_field", id: props.field.id })
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
}
