import React, { useState } from "react";
import { OptionsFields, MultiValueFields } from "../Utils/interfaces";
import DropdownModal from "./OptionsFieldModal";

export default function DropdownInput(props: {
  field: OptionsFields | MultiValueFields;
  removeFieldCB: (id: number) => void;
  editLabelCB: (id: number, value: string) => void;
  editOptionsCB: (id: number, value: string[]) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="border-2 border-grey-200 rounded-lg p-1 my-2 flex-1"
          type="text"
          value={props.field.label}
          onChange={(e) => props.editLabelCB(props.field.id, e.target.value)}
        />
        <div className="relative inline-flex">
          <button
            className=" m-4  bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            {props.field.kind}
          </button>
          {showModal && (
            <DropdownModal
              field={props.field}
              editOptionsCB={props.editOptionsCB}
              handleCloseModalCB={handleCloseModal}
            />
          )}
        </div>

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
