// import React, { useState } from "react";
// import { FormStateActionSubset } from "../Forms/Form";
// import { OptionsFields, MultiValueFields } from "../types/formTypes";
// import DropdownModal from "./OptionsFieldModal";

// export default function DropdownInput(props: {
//   field: OptionsFields | MultiValueFields;
//   dispatchActionCB: (action: FormStateActionSubset) => void;
// }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <div className="flex gap-2">
//         <input
//           className="border-2 border-grey-200 rounded-lg p-1 my-2 flex-1"
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
//           <button
//             className=" m-4  bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
//             onClick={() => setShowModal(true)}
//           >
//             {props.field.kind}
//           </button>
//           {showModal && (
//             <DropdownModal
//               field={props.field}
//               editOptionsCB={(id, value) =>
//                 props.dispatchActionCB({
//                   type: "edit_options",
//                   id,
//                   options: value,
//                 })
//               }
//               handleCloseModalCB={handleCloseModal}
//             />
//           )}
//         </div>

//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
//           onClick={(_) =>
//             props.dispatchActionCB({ type: "remove_field", id: props.field.id })
//           }
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";

function OptionsFieldInput() {
  return <div>OptionsFieldInput</div>;
}

export default OptionsFieldInput;
