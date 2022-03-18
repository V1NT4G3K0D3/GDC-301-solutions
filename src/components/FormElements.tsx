import React from "react";
import "../styles/input.css";
function FormElements(props: {
  formFields: { label: string; id: number; type: string }[];
}) {
  return (
    <React.Fragment>
      {props.formFields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>
          <input
            className="border-2 border-grey-200 rounded-lg p-2 my-2 w-full"
            type={field.type}
          />
        </div>
      ))}
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded">
        Button
      </button>
    </React.Fragment>
  );
}

export default FormElements;
