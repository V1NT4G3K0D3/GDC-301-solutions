import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import MultiSelectPreviewField from "../PreviewTypes/MultiSelectPreviewField";
import { Answers } from "../Utils/interfaces";
import { getForm } from "../Utils/localStorageUtils";

// localStorage["form"] // Defenitions of the Form/FormFields -> Answers/Attempt
// localStorage["preview"] // Answers/Attempt with questionId {attempt: 232, attemptedAt: Date, attempts: [{questionId: 1, answer: "A"}]}

// const initializeAttempts = (form: FormData) => {
//   return {
//     attempt: Number(new Date()),
//     attempts: form.formFields.map((field) => {
//       if (field.kind === "multiselectdropdown")
//         return {
//           questionId: field.id,
//           answer: [] as String[],
//         };
//       return {
//         questionId: field.id,
//         answer: "",
//       };
//     }),
//   };
// };

function PreviewField(props: { id: number; fieldId: number }) {
  const form = getForm(props.id);
  const [answers, setAnswers] = useState<Answers>({
    attempt: Number(new Date()),
    attempts: form.formFields.map((field) => ({
      questionId: Number(new Date()),
      answer: field.value,
    })),
  });

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (
    e: BeforeUnloadEvent /*synthetic event [wrapper for all events]*/
  ) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const clearForm = () => {
    setAnswers({
      attempt: Number(new Date()),
      attempts: [],
    });
  };

  const getNext = () => {
    if (props.fieldId >= form.formFields.length) {
      return 0;
    }
    return props.fieldId + 1;
  };

  const changeValue = (e: string | string[], id: number) => {
    let attempts = answers.attempts;
    attempts[id] = {
      questionId: attempts[id].questionId,
      answer: e,
    };
    setAnswers({
      ...answers,
      attempts,
    });
  };

  // const saveFormValue = () => {
  //   form.formFields.map((formField) => {

  //   })
  // }

  const currentField = form.formFields[props.fieldId - 1];
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
            onChange={(e) => changeValue(e.target.value, props.fieldId - 1)}
          />
        ) : currentField.kind === "dropdown" ? (
          <select
            className="w-full border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
            value={answers.attempts[props.fieldId - 1].answer}
            onChange={(e) => changeValue(e.target.value, props.fieldId - 1)}
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
                    changeValue(e.target.value, props.fieldId - 1)
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
            onChange={(e) => changeValue(e.target.value, props.fieldId - 1)}
          />
        ) : currentField.kind === "multiselectdropdown" ? (
          <div>
            <MultiSelectPreviewField
              answers={answers}
              changeValueCB={changeValue}
              fieldId={props.fieldId - 1}
              currentField={currentField}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default PreviewField;
