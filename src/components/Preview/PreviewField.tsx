import { Link } from "raviger";
import React, { useEffect, useReducer, useState } from "react";
import MultiSelectPreviewField from "../PreviewTypes/MultiSelectPreviewField";
import { Pagination } from "../types/common";
import { Answers, APIForm, APIFormField } from "../types/formTypes";
import { getForm, listFormFields, updateForm } from "../Utils/apiUtils";

type ClearAllAction = {
  type: "clear_all";
};

type ChangeAnswerAction = {
  type: "change_answer";
  id: number;
  answer: string | string[];
};

type AnswerActions = ClearAllAction | ChangeAnswerAction;

const reducer = (state: Answers, action: AnswerActions) => {
  switch (action.type) {
    case "clear_all":
      return {
        attempt: Number(new Date()),
        attempts: [],
      };

    case "change_answer": {
      let attempts = state.attempts;
      attempts[action.id] = {
        questionId: attempts[action.id].questionId,
        answer: action.answer,
      };
      return {
        ...state,
        attempts,
      };
    }
  }
};

const fetchForm = async (
  formId: number,
  setFormStateCB: (value: APIForm) => void
) => {
  try {
    const data: APIForm = await getForm(formId);
    setFormStateCB(data);
  } catch (e) {
    console.error(e);
  }
};

const fetchFormFields = async (
  formId: number,
  setFormsFieldsCB: (apiForm: APIFormField[]) => void
) => {
  try {
    const data: Pagination<APIFormField> = await listFormFields(
      { offset: 0, limit: 2 },
      formId
    );
    setFormsFieldsCB(data.results);
  } catch (e) {
    console.error(e);
  }
};

const saveFormData = async (
  formData: APIForm,
  setFormStateCB: (value: APIForm) => void
) => {
  try {
    const data: APIForm = await updateForm(formData);
    setFormStateCB(data);
  } catch (e) {
    console.error(e);
  }
};

// export default function Form(props: { id: number }) {

function PreviewField(props: { id: number; fieldId: number }) {
  const [form, setForm] = useState<APIForm | undefined>(undefined);
  const [formFieldsState, setFormFieldsState] = useState<
    APIFormField[] | undefined
  >(undefined);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  useEffect(() => {
    fetchForm(props.id, setForm);
  });

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const getNext = () => {
    if (formFieldsState) {
      if (props.fieldId >= formFieldsState.length) {
        return 0;
      }
      return props.fieldId + 1;
    }
  };
  let currentField: APIFormField | undefined;
  if (formFieldsState) {
    currentField = formFieldsState[props.fieldId - 1];
  }
  return (
    <div>
      {/* <div className="my-4">
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
              onClick={() => dispatch({ type: "clear_all" })}
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
              // onClick={() => {
              //   saveFormData(form);
              // }}
            >
              Finish
            </Link>
          )}
        </ul>
      </div>

      <div className="flex-col justify-center align-middle space-y-2 my-4">
        <div className="text-md font-bold ">{currentField.label}</div>

        {currentField.kind === "text" ? (
          <input
            className="w-full border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
            type={currentField.type}
            value={answers.attempts[props.fieldId - 1].answer}
            onChange={(e) =>
              dispatch({
                type: "change_answer",
                answer: e.target.value,
                id: props.fieldId - 1,
              })
            }
          />
        ) : currentField.kind === "dropdown" ? (
          <select
            className="w-full border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
            value={answers.attempts[props.fieldId - 1].answer}
            onChange={(e) =>
              dispatch({
                type: "change_answer",
                answer: e.target.value,
                id: props.fieldId - 1,
              })
            }
          >
            <option value="">Select</option>
            {currentField.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : currentField.kind === "radio" ? (
          <div>
            {currentField.options.map((option, index) => (
              <React.Fragment key={index}>
                <input
                  type={"radio"}
                  value={answers.attempts[props.fieldId - 1].answer}
                  name={currentField.label}
                  onChange={(e) =>
                    dispatch({
                      type: "change_answer",
                      answer: e.target.value,
                      id: props.fieldId - 1,
                    })
                  }
                />
                <label>{option}</label>
                <br />
              </React.Fragment>
            ))}
          </div>
        ) : currentField.kind === "textarea" ? (
          <textarea
            className="w-full border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
            value={answers.attempts[props.fieldId - 1].answer}
            onChange={(e) =>
              dispatch({
                type: "change_answer",
                answer: e.target.value,
                id: props.fieldId - 1,
              })
            }
          />
        ) : currentField.kind === "multiselectdropdown" ? (
          <div>
            <MultiSelectPreviewField
              answers={answers}
              changeValueCB={(e, id) =>
                dispatch({ type: "change_answer", answer: e, id })
              }
              fieldId={props.fieldId - 1}
              currentField={currentField}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div> */}
    </div>
  );
}

export default PreviewField;
