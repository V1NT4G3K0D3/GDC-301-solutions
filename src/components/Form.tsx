import React, { useState } from "react";

import LabelledInput from "./LabelledInput";

const formFields = [
  { label: "First Name", id: 1, type: "text", value: "" },
  { label: "Last Name", id: 2, type: "text", value: "" },
  { label: "Email", id: 3, type: "email", value: "" },
  { label: "DOB", id: 4, type: "date", value: "" },
  { label: "Phone number", id: 5, type: "number", value: "" },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [formState, setFormState] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setFormState([
      ...formState,
      {
        label: newField,
        id: Number(new Date()),
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setFormState(formState.filter((field) => field.id !== id));
  };

  const clearForm = () => {
    setFormState(
      (formState) =>
        (formState = formState.map((field) => ({ ...field, value: "" })))
    );
  };

  const editField = (id: number, value: string) => {
    setFormState(
      formState.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  return (
    // Initial form elements

    <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
      <div>
        {formState.map((field, index) => (
          <LabelledInput
            // key={index}
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            editFieldCB={editField}
          />
        ))}
      </div>

      {/* Add a new field */}

      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      {/* Submit form, Clear form, CLose form */}

      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg">
          Submit
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          onClick={() => clearForm()}
        >
          Clear Form
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          onClick={() => props.closeFormCB()}
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
