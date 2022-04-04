import React, { useState, useEffect, useRef } from "react";

import LabelledInput from "./LabelledInput";
import { initialState, saveFormData, getForm } from "./localStorageUtils";

export default function Form(props: { closeFormCB: () => void; id: number }) {
  const [formState, setFormState] = useState(() => getForm(props.id));
  const [newField, setNewField] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component mounted");
    const oldTitle = document.title;
    document.title = "Form editor";

    titleRef.current?.focus();

    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(formState);
      console.log("Saved state");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [formState]);

  const addField = () => {
    setFormState({
      ...formState,
      formFields: [
        ...formState.formFields,
        {
          label: newField,
          id: Number(new Date()),
          type: "text",
          value: "",
        },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setFormState({
      ...formState,
      formFields: formState.formFields.filter((field) => field.id !== id),
    });
  };

  const clearForm = () => {
    setFormState(
      (formState) =>
        (formState = {
          ...formState,
          formFields: formState.formFields.map((field) => ({
            ...field,
            value: "",
          })),
        })
    );
  };

  const editField = (id: number, value: string) => {
    setFormState(
      (formState) =>
        (formState = {
          ...formState,
          formFields: formState.formFields.map((field) =>
            field.id === id ? { ...field, value } : field
          ),
        })
    );
  };

  return (
    // Initial form elements

    <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
      <input
        type="text"
        className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
        value={formState.title}
        onChange={(e) => {
          setFormState({
            ...formState,
            title: e.target.value,
          });
        }}
        ref={titleRef}
      />
      <div>
        {formState.formFields.map((field, index) => (
          <LabelledInput
            // key={index}
            key={field.id}
            field={field}
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
        <button
          onClick={() => {
            saveFormData(formState);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
        >
          Save
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          onClick={clearForm}
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
