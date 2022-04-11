import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import { getForm, saveFormData } from "../Utils/localStorageUtils";

function PreviewField(props: { id: number; fieldId: number }) {
  const [formState, setFormState] = useState(() => {
    const form = getForm(props.id);
    if (form) {
      return {
        ...form,
        formFields: form.formFields.map((field) => {
          return {
            ...field,
            value: "",
          };
        }),
      };
    }
    return form;
  });

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
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

  const clearForm = () => {
    console.log("Clearing form");
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

  const getNext = () => {
    if (props.fieldId >= formState.formFields.length) {
      console.log("Last field");
      return 0;
    }
    return props.fieldId + 1;
  };

  return (
    <div>
      <div className="my-4">
        <ul className="flex justify-center space-x-2">
          {props.fieldId - 1 ? (
            <Link
              className={`py-1 px-3 rounded-lg text-gray-500 bg-gray-200 cursor-pointer`}
              href={`/preview/${props.id}/${props.fieldId - 1}`}
            >
              Prev
            </Link>
          ) : (
            <Link
              className="py-1 px-3 rounded-lg text-gray-500 bg-gray-200 cursor-pointer"
              href={`/preview/${props.id}`}
              onClick={clearForm}
            >
              Cancel
            </Link>
          )}

          <Link
            href={`/preview/${props.id}/${props.fieldId}`}
            className="py-1 px-3 bg-white rounded-lg cursor-pointer"
          >
            {props.fieldId}
          </Link>

          {getNext() ? (
            <Link
              href={`/preview/${props.id}/${getNext()}`}
              className="py-1 px-3 rounded-lg text-gray-500 bg-gray-200 cursor-pointer"
            >
              Next
            </Link>
          ) : (
            <Link
              href={`/preview/${props.id}`}
              className="py-1 px-3 rounded-lg text-gray-500 bg-gray-200 cursor-pointer"
              onClick={() => {
                saveFormData(formState);
              }}
            >
              Finish
            </Link>
          )}
        </ul>
      </div>

      <div className="flex-col justify-center align-middle space-y-2 my-4">
        <div className="text-md font-bold ">
          {getForm(props.id).formFields[props.fieldId - 1].label}
        </div>
        <input
          className="w-full border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
          type={formState.formFields[props.fieldId - 1].type}
          value={formState.formFields[props.fieldId - 1].value}
          onChange={(e) =>
            editField(
              formState.formFields[props.fieldId - 1].id,
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
}

export default PreviewField;
