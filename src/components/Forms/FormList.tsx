// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { FormListItem } from "./FormListItem";
// import { useQueryParams } from "raviger";
// import Modal from "../common/modal";
// import CreateFormModal from "./CreateFormModal";
// import { listForms, deleteForm, listFormFields } from "../Utils/apiUtils";
// import { Pagination } from "../types/common";
// import { APIForm, APIFormFields } from "../types/formTypes";

// const fetchForms = async (setFormsCB: (apiForm: APIForm[]) => void) => {
//   try {
//     const data: Pagination<APIForm> = await listForms({ offset: 0, limit: 2 });
//     setFormsCB(data.results);
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const FormList = () => {
//   const [{ search }, setQueryParams] = useQueryParams();
//   const [forms, setForms] = useState<APIForm[] | undefined>(undefined);

//   const [newForm, setNewForm] = useState(false);

//   const [searchString, serSearchString] = useState("");

//   const handleDelete = async (id: number | undefined) => {
//     if (id === undefined) return;
//     await deleteForm(Number(id));
//     fetchForms(setForms);
//   };

//   useEffect(() => {
//     fetchForms(setForms);
//   }, []);

//   return (
//     <div className="flex-col flex justify-center">
//       <div className="flex justify-center text-center">
//         {/* <form action="/forms" method="GET"> */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             setQueryParams({ search: searchString });
//           }}
//         >
//           <input
//             type="text"
//             className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1 w-full h-auto"
//             value={searchString}
//             name="search"
//             onChange={(e) => {
//               serSearchString(e.target.value);
//             }}
//             placeholder="Search for a form"
//           />
//         </form>
//         <button
//           className="text-center h-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 mx-2 rounded-lg"
//           onClick={() => {
//             setNewForm(true);
//           }}
//           // href="/forms/0" with <a> tag
//         >
//           + Create new form
//         </button>
//       </div>
//       <div className="flex flex-wrap justify-center">
//         {forms &&
//           forms
//             .filter((form) =>
//               form.title.toLowerCase().includes(search?.toLowerCase() || "")
//             )
//             .map((form) => (
//               <FormListItem
//                 key={form.id}
//                 form={form}
//                 handleDeleteCB={handleDelete}
//               />
//             ))}
//       </div>

//       <Modal
//         open={newForm}
//         closeCB={() => {
//           setNewForm(false);
//         }}
//       >
//         <CreateFormModal />
//       </Modal>
//     </div>
//   );
// };

import React from "react";

function FormList() {
  return <div>FormList</div>;
}

export default FormList;
