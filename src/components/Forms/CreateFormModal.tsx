// import { navigate } from "raviger";
// import React from "react";
// import { Errors, APIForm, validateForm } from "../types/formTypes";

// import { createForm } from "../Utils/apiUtils";

// function CreateFormModal() {
//   const [form, setForm] = React.useState<APIForm>({
//     title: "",
//     description: "",
//     isPublic: false,
//   });

//   const [errors, setErrors] = React.useState<Errors<APIForm>>({});

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const validationErrors = validateForm(form);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const data = await createForm(form);
//         navigate(`/forms/${data.id}`);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-lg divide-y divide-gray-200">
//       <h1 className="text-2xl my-2 text-gray-700">Create form</h1>
//       <form className="py-4" onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="title"
//             type="text"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-xs italic">{errors.title}</p>
//           )}
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />
//           {errors.description && (
//             <p className="text-red-500 text-xs italic">{errors.description}</p>
//           )}
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="isPublic"
//           >
//             Is Public
//           </label>
//           <input
//             className="w-4 h-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="isPublic"
//             type="checkbox"
//             checked={form.isPublic}
//             onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Create
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateFormModal;

import React from "react";

function CreateFormModal() {
  return <div>CreateFormModal</div>;
}

export default CreateFormModal;
