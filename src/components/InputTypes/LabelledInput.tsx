// import { FormStateActionSubset } from "../Forms/Form";
// import React from "react";
// import { APIFormField, FormFieldKind, TypeFields } from "../types/formTypes";

// export default function LabelledInput(props: {
//   field: APIFormField;
//   editLabel: (id: number, label: string) => void;
//   editType: (id: number, fieldType: FormFieldKind) => void;
//   dispatchActionCB: (action: FormStateActionSubset) => void;
// }) {
//   return (
//     <div>
//       <div className="flex gap-2">
//         <input
//           className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
//           type="text"
//           value={props.field.label}
//           onChange={(e) =>
//             props.dispatchActionCB({
//               type: "edit_label",
//               id: props.field.id,
//               label: e.target.value,
//             })
//           }
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
//             value={props.field.type}
//             onChange={(e) =>
//               props.dispatchActionCB({
//                 type: "edit_type",
//                 id: props.field.id,
//                 fieldType: e.target.value as FormFieldKind,
//               })
//             }
//           >
//             <option value="">Type</option>
//             <option value="text">text</option>
//             <option value="number">number</option>
//             <option value="date">date</option>
//             <option value="email">email</option>
//             <option value="password">password</option>
//             <option value="url">url</option>
//           </select>
//         </div>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
//           onClick={(_) =>
//             props.dispatchActionCB({
//               type: "remove_field",
//               id: props.field.id,
//             })
//           }
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";

function LabelledInput() {
  return <div>LabelledInput</div>;
}

export default LabelledInput;
