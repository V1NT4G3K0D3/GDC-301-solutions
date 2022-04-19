import React from "react";
import { Link } from "raviger";
import { getUndefinedOrForm } from "../Utils/localStorageUtils";
import NotFound from "../NotFound";

function Preview(props: { id: number }) {
  const form = getUndefinedOrForm(props.id);
  if (form === undefined) {
    return <NotFound name="PREVIEW" />;
  }
  return (
    <div className="flex-col justify-center align-middle text-center">
      <div className="text-xl font-bold m-4">{form.title}</div>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
        href={
          form.formFields.length > 0
            ? `/preview/${props.id}/1`
            : `/forms/${props.id}`
        }
      >
        Start preview
      </Link>
      <div>
        <p className="text-md my-4">Current responses</p>
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Field Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Response
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Type
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {form.formFields.map((field, index) => (
                      <tr
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={index}
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {field.label}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {field.value}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {field.kind} {field.kind === "text" && field.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
