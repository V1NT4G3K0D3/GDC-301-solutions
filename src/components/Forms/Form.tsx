import React, { useState, useEffect, useRef } from "react";
import { saveFormData, getUndefinedOrForm } from "../Utils/localStorageUtils";
import { Link } from "raviger";

import NotFound from "../NotFound";
import LabelledInput from "../InputTypes/LabelledInput";
import DropdownInput from "../InputTypes/OptionsFieldInput";
import TextareaInput from "../InputTypes/TextareaInput";

export default function Form(props: { id: number }) {
  const [formState, setFormState] = useState(() =>
    getUndefinedOrForm(props.id)
  );
  const [newField, setNewField] = useState("");
  const [newFieldKind, setNewFieldKind] = useState<string>("text");

  const titleRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (formState !== undefined) {
  //     formState.id !== props.id && navigate(`/forms/${formState.id}`);
  //     console.log(formState.id, props.id);
  //   }
  // }, [formState?.id, props.id]);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form editor";

    titleRef.current?.focus();

    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      formState && saveFormData(formState);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [formState]);

  const addField = () => {
    if (formState) {
      if (newFieldKind === "text") {
        setFormState({
          ...formState,
          formFields: [
            ...formState.formFields,
            {
              kind: "text",
              label: newField,
              id: Number(new Date()),
              type: "text",
              value: "",
            },
          ],
        });
      } else if (newFieldKind === "dropdown" || newFieldKind === "radio") {
        setFormState({
          ...formState,
          formFields: [
            ...formState.formFields,
            {
              kind: newFieldKind,
              label: newField,
              id: Number(new Date()),
              options: [],
              value: "",
            },
          ],
        });
      } else if (newFieldKind === "textarea") {
        setFormState({
          ...formState,
          formFields: [
            ...formState.formFields,
            {
              kind: newFieldKind,
              label: newField,
              id: Number(new Date()),
              type: "textarea",
              value: "",
            },
          ],
        });
      } else if (newFieldKind === "multiselectdropdown") {
        setFormState({
          ...formState,
          formFields: [
            ...formState.formFields,
            {
              kind: newFieldKind,
              label: newField,
              id: Number(new Date()),
              options: [],
              value: [],
            },
          ],
        });
      }

      setNewField("");
      setNewFieldKind("text");
    }
  };

  const removeField = (id: number) => {
    formState &&
      setFormState({
        ...formState,
        formFields: formState.formFields.filter((field) => field.id !== id),
      });
  };

  const editLabel = (id: number, label: string) => {
    formState &&
      setFormState((formState) => {
        if (formState !== undefined) {
          return {
            ...formState,
            formFields: formState.formFields.map((field) =>
              field.id === id ? { ...field, label } : field
            ),
          };
        }
      });
  };
  const editType = (id: number, type: string) => {
    formState &&
      setFormState((formState) => {
        if (formState !== undefined) {
          return {
            ...formState,
            formFields: formState.formFields.map((field) =>
              field.id === id ? { ...field, type } : field
            ),
          };
        }
      });
  };

  const editOptions = (id: number, options: string[]) => {
    formState &&
      setFormState((formState) => {
        if (formState !== undefined) {
          return {
            ...formState,
            formFields: formState.formFields.map((field) =>
              field.id === id ? { ...field, options } : field
            ),
          };
        }
      });
  };

  if (formState === undefined) {
    return <NotFound name="FORM" />;
  }
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
        {formState.formFields.map((field, index) => {
          switch (field.kind) {
            case "text":
              return (
                <LabelledInput
                  // key={index}
                  key={field.id}
                  field={field}
                  removeFieldCB={removeField}
                  editLabelCB={editLabel}
                  editTypeCB={editType}
                />
              );
            case "dropdown":
              return (
                <DropdownInput
                  key={field.id}
                  field={field}
                  removeFieldCB={removeField}
                  editLabelCB={editLabel}
                  editOptionsCB={editOptions}
                />
              );
            case "radio":
              return (
                <DropdownInput
                  key={field.id}
                  field={field}
                  removeFieldCB={removeField}
                  editLabelCB={editLabel}
                  editOptionsCB={editOptions}
                />
              );
            case "multiselectdropdown":
              return (
                <DropdownInput
                  key={field.id}
                  field={field}
                  removeFieldCB={removeField}
                  editLabelCB={editLabel}
                  editOptionsCB={editOptions}
                />
              );

            case "textarea":
              return (
                <TextareaInput
                  key={field.id}
                  field={field}
                  removeFieldCB={removeField}
                  editLabelCB={editLabel}
                  editTypeCB={editType}
                />
              );
            default:
              return <div>Unknown field type</div>;
          }
        })}
      </div>

      {/* Add a new field */}

      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 border-grey-200 rounded-lg p-1 my-2 flex-1"
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <div className="relative inline-flex">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-8 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            />
          </svg>
          <select
            className="border m-4 border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            value={newFieldKind}
            onChange={(e) => setNewFieldKind(e.target.value)}
          >
            <option value="">Type</option>
            <option value="text">text</option>
            <option value="dropdown">dropdown</option>
            <option value="radio">radio</option>
            <option value="textarea">textarea</option>
            <option value="multiselectdropdown">multiselect</option>
          </select>
        </div>

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

        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
          href="/forms"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
