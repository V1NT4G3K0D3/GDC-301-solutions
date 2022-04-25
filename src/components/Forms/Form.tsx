// import React, { useState, useEffect, useRef, useReducer } from "react";
// import { Link, navigate } from "raviger";

// import NotFound from "../NotFound";
// import LabelledInput from "../InputTypes/LabelledInput";
// import DropdownInput from "../InputTypes/OptionsFieldInput";
// import TextareaInput from "../InputTypes/TextareaInput";
// import {
//   FormFieldKind,
//   FormData,
//   FormField,
//   APIForm,
//   APIFormField,
// } from "../types/formTypes";
// import { Pagination } from "../types/common";
// import {
//   getForm,
//   listFormFields,
//   listForms,
//   updateForm,
// } from "../Utils/apiUtils";

// type RemoveAction = {
//   type: "remove_field";
//   id: number;
// };

// type AddAction = {
//   type: "add_field";
//   kind: FormFieldKind;
//   label: string;
//   callback: () => void;
// };

// type EditTitleAction = {
//   type: "edit_title";
//   value: string;
// };

// type EditLabelAction = {
//   type: "edit_label";
//   id: number;
//   label: string;
// };

// type EditTypeAction = {
//   type: "edit_type";
//   id: number;
//   fieldType: FormFieldKind;
// };

// type EditOptionsAction = {
//   type: "edit_options";
//   id: number;
//   options: string[];
// };

// export type FormStateAction =
//   | AddAction
//   | RemoveAction
//   | EditTitleAction
//   | EditLabelAction
//   | EditTypeAction
//   | EditOptionsAction;

// export type FormStateActionSubset =
//   | RemoveAction
//   | EditLabelAction
//   | EditTypeAction
//   | EditOptionsAction;

// const getNewField = (kind: FormFieldKind, label: string): FormField => {
//   const newField = {
//     label,
//     id: Date.now(),
//   };

//   if (kind === "multiselectdropdown") {
//     return {
//       ...newField,
//       kind,
//       options: [],
//       value: [],
//     };
//   } else if (kind === "dropdown" || kind === "radio") {
//     return {
//       ...newField,
//       kind,
//       options: [],
//       value: "",
//     };
//   } else if (kind === "textarea") {
//     return {
//       ...newField,
//       kind,
//       value: "",
//       type: "textarea",
//     };
//   } else {
//     // for kind:text, number, date, time, email, phone
//     return {
//       ...newField,
//       kind,
//       value: "",
//       type: "text",
//     };
//   }
// };

// const reducer = (state: FormData | undefined, action: FormStateAction) => {
//   if (state === undefined) {
//     return undefined;
//   }
//   switch (action.type) {
//     case "add_field": {
//       const newField = getNewField(action.kind, action.label);
//       if (newField.label.length > 0) {
//         action.callback();
//         return {
//           ...state,
//           formFields: [...state.formFields, newField],
//         };
//       }
//       return state;
//     }

//     case "remove_field": {
//       return {
//         ...state,
//         formFields: state.formFields.filter((field) => {
//           return field.id !== action.id;
//         }),
//       };
//     }

//     case "edit_title": {
//       return {
//         ...state,
//         title: action.value,
//       };
//     }

//     case "edit_label": {
//       return {
//         ...state,
//         formFields: state.formFields.map((field) =>
//           field.id === action.id ? { ...field, label: action.label } : field
//         ),
//       };
//     }

//     case "edit_type": {
//       return {
//         ...state,
//         formFields: state.formFields.map((field) =>
//           field.id === action.id ? { ...field, type: action.fieldType } : field
//         ),
//       };
//     }

//     case "edit_options": {
//       return {
//         ...state,
//         formFields: state.formFields.map((field) =>
//           field.id === action.id ? { ...field, options: action.options } : field
//         ),
//       };
//     }
//   }
// };

// type ClearText = {
//   type: "clear_text";
// };

// type ChangeText = {
//   type: "change_text";
//   value: string;
// };

// type NewFieldActions = ChangeText | ClearText;

// const newFieldReducer = (state: string, action: NewFieldActions) => {
//   switch (action.type) {
//     case "change_text":
//       return action.value;

//     case "clear_text":
//       return "";
//   }
// };

// const fetchForm = async (
//   formId: number,
//   setFormStateCB: (value: APIForm) => void
// ) => {
//   try {
//     const data: APIForm = await getForm(formId);
//     setFormStateCB(data);
//   } catch (e) {
//     console.error(e);
//   }
// };

// const fetchFormFields = async (
//   formId: number,
//   setFormsFieldsCB: (apiForm: APIFormField[]) => void
// ) => {
//   try {
//     const data: Pagination<APIFormField> = await listFormFields(
//       { offset: 0, limit: 2 },
//       formId
//     );
//     setFormsFieldsCB(data.results);
//   } catch (e) {
//     console.error(e);
//   }
// };

// const saveFormData = async (
//   formData: APIForm,
//   setFormStateCB: (value: APIForm) => void
// ) => {
//   try {
//     const data: APIForm = await updateForm(formData);
//     setFormStateCB(data);
//   } catch (e) {
//     console.error(e);
//   }
// };

// export default function Form(props: { id: number }) {
//   const [formState, setFormState] = useState<APIForm | undefined>(undefined);
//   const [formFieldsState, setFormFieldsState] = useState<
//     APIFormField[] | undefined
//   >(undefined);
//   const [newField, dispatchNewField] = useReducer(newFieldReducer, "");
//   const [newFieldKind, setNewFieldKind] = useState<FormFieldKind>("text");

//   const titleRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchForm(props.id, setFormState);
//     fetchFormFields(props.id, setFormFieldsState);
//   }, []);

//   useEffect(() => {
//     if (formState !== undefined) {
//       formState.id !== props.id && navigate(`/forms/${formState.id}`);
//       console.log(formState.id, props.id);
//     }
//   }, [formState, props.id]);

//   useEffect(() => {
//     const oldTitle = document.title;
//     document.title = "Form editor";

//     titleRef.current?.focus();

//     return () => {
//       document.title = oldTitle;
//     };
//   }, []);

//   useEffect(() => {
//     let timeout = setTimeout(() => {
//       formState && saveFormData(formState, setFormState);
//     }, 1000);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [formState]);

//   if (formState === undefined) {
//     return <NotFound name="FORM" />;
//   }
//   return (
//     // Initial form elements
//     <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
//       <input
//         type="text"
//         className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
//         value={formState.title}
//         onChange={(e) =>
//           dispatch({ type: "edit_title", value: e.target.value })
//         }
//         ref={titleRef}
//       />
//       <div>
//         {formFieldsState &&
//           formFieldsState.map((field, index) => {
//             switch (field.kind) {
//               case "TEXT":
//                 return (
//                   <LabelledInput
//                     key={field.id}
//                     field={field}
//                     dispatchActionCB={dispatch}
//                   />
//                 );
//               case "DROPDOWN":
//               case "RADIO":
//                 return (
//                   <DropdownInput
//                     key={field.id}
//                     field={field}
//                     dispatchActionCB={dispatch}
//                   />
//                 );
//               default:
//                 return <div>Unknown field type</div>;
//             }
//           })}
//       </div>

//       {/* Add a new field */}

//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="border-2 border-grey-200 rounded-lg p-1 my-2 flex-1"
//           value={newField}
//           onChange={(e) => {
//             dispatchNewField({ type: "change_text", value: e.target.value });
//           }}
//         />
//         <div className="relative inline-flex">
//           <svg
//             className="w-2 h-2 absolute top-0 right-0 m-8 pointer-events-none"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 412 232"
//           >
//             <path
//               d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
//               fill="#648299"
//               fill-rule="nonzero"
//             />
//           </svg>
//           <select
//             className="border m-4 border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
//             value={newFieldKind}
//             onChange={(e) => setNewFieldKind(e.target.value as FormFieldKind)}
//           >
//             <option value="">Type</option>
//             <option value="text">text</option>
//             <option value="dropdown">dropdown</option>
//             <option value="radio">radio</option>
//             <option value="textarea">textarea</option>
//             <option value="multiselectdropdown">multiselect</option>
//           </select>
//         </div>

//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
//           onClick={(_) =>
//             dispatch({
//               type: "add_field",
//               label: newField,
//               kind: newFieldKind,
//               callback: () => dispatchNewField({ type: "clear_text" }),
//             })
//           }
//         >
//           Add Field
//         </button>
//       </div>

//       {/* Submit form, CLose form */}

//       <div className="flex gap-4">
//         <button
//           onClick={() => {
//             saveFormData(formState);
//           }}
//           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
//         >
//           Save
//         </button>

//         <Link
//           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
//           href="/forms"
//         >
//           Close Form
//         </Link>
//       </div>
//     </div>
//   );
// }

import React from "react";

function Form() {
  return <div>Form</div>;
}

export default Form;
