import React, { useState, useEffect, useRef, useReducer } from "react";
import { saveFormData, getUndefinedOrForm } from "../Utils/localStorageUtils";
import { Link, navigate } from "raviger";

import NotFound from "../NotFound";
import LabelledInput from "../InputTypes/LabelledInput";
import DropdownInput from "../InputTypes/OptionsFieldInput";
import TextareaInput from "../InputTypes/TextareaInput";
import { FormFieldKind, FormData, FormField } from "../Utils/interfaces";

type RemoveAction = {
  type: "remove_field";
  id: number;
};

type AddAction = {
  type: "add_field";
  kind: FormFieldKind;
  label: string;
  callback: () => void;
};

type EditLabelAction = {
  type: "edit_label";
  id: number;
  label: string;
};

type EditTypeAction = {
  type: "edit_type";
  id: number;
  fieldType: FormFieldKind;
};

type EditOptionsAction = {
  type: "edit_options";
  id: number;
  options: string[];
};

export type Action =
  | AddAction
  | RemoveAction
  | EditLabelAction
  | EditTypeAction
  | EditOptionsAction;

const getNewField = (kind: FormFieldKind, label: string): FormField => {
  const newField = {
    label,
    id: Date.now(),
  };

  if (kind === "multiselectdropdown") {
    return {
      ...newField,
      kind,
      options: [],
      value: [],
    };
  } else if (kind === "dropdown" || kind === "radio") {
    return {
      ...newField,
      kind,
      options: [],
      value: "",
    };
  } else if (kind === "textarea") {
    return {
      ...newField,
      kind,
      value: "",
      type: "textarea",
    };
  } else {
    // for kind:text, number, date, time, email, phone
    return {
      ...newField,
      kind,
      value: "",
      type: "text",
    };
  }
};

const reducer = (state: FormData, action: Action) => {
  switch (action.type) {
    case "add_field": {
      const newField = getNewField(action.kind, action.label);
      if (newField.label.length > 0) {
        action.callback();
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      }
      return state;
    }

    case "remove_field": {
      return {
        ...state,
        formFields: state.formFields.filter((field) => {
          return field.id !== action.id;
        }),
      };
    }

    case "edit_label": {
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id ? { ...field, label: action.label } : field
        ),
      };
    }

    case "edit_type": {
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id ? { ...field, type: action.fieldType } : field
        ),
      };
    }

    case "edit_options": {
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id ? { ...field, options: action.options } : field
        ),
      };
    }
  }
};

type ClearText = {
  type: "clear_text";
};

type ChangeText = {
  type: "change_text";
  value: string;
};

type NewFieldActions = ChangeText | ClearText;

const newFieldReducer = (state: string, action: NewFieldActions) => {
  switch (action.type) {
    case "change_text":
      return action.value;

    case "clear_text":
      return "";
  }
};

export default function Form(props: { id: number }) {
  const [formState, dispatch] = useReducer<
    Reducer<FormData | undefined, Action>
  >(reducer, props.id, getUndefinedOrForm);
  const [newField, dispatchNewField] = useReducer(newFieldReducer, "");
  const [newFieldKind, setNewFieldKind] = useState<FormFieldKind>("text");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formState !== undefined) {
      formState.id !== props.id && navigate(`/forms/${formState.id}`);
      console.log(formState.id, props.id);
    }
  }, [formState, props.id]);

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

  const dispatchAction = (action: Action) => {
    setFormState((prevState) => {
      if (prevState === undefined) {
        return prevState;
      }
      return reducer(prevState, action);
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
                  key={field.id}
                  field={field}
                  dispatchActionCB={dispatchAction}
                />
              );
            case "dropdown":
              return (
                <DropdownInput
                  key={field.id}
                  field={field}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
                  editLabelCB={editLabel}
                  editOptionsCB={editOptions}
                />
              );
            case "radio":
              return (
                <DropdownInput
                  key={field.id}
                  field={field}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
                  editLabelCB={editLabel}
                  editOptionsCB={editOptions}
                />
              );
            case "multiselectdropdown":
              return (
                <DropdownInput
                  key={field.id}
                  field={field}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
                  editLabelCB={editLabel}
                  editOptionsCB={editOptions}
                />
              );

            case "textarea":
              return (
                <TextareaInput
                  key={field.id}
                  field={field}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
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
            dispatchNewField({ type: "change_text", value: e.target.value });
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
            onChange={(e) => setNewFieldKind(e.target.value as FormFieldKind)}
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
          onClick={(_) =>
            dispatchAction({
              type: "add_field",
              label: newField,
              kind: newFieldKind,
              callback: () => dispatchNewField({ type: "clear_text" }),
            })
          }
        >
          Add Field
        </button>
      </div>

      {/* Submit form, CLose form */}

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
