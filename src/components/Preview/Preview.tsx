import React, { useEffect, useState } from "react";
import { Link } from "raviger";
import NotFound from "../NotFound";
import { APIForm, APIFormField } from "../types/formTypes";
import { getForm, listFormFields } from "../Utils/apiUtils";
import { Pagination } from "../types/common";

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

function Preview(props: { id: number }) {
  const [form, setForm] = useState<APIForm | undefined>(undefined);
  const [formFieldsState, setFormFieldsState] = useState<
    APIFormField[] | undefined
  >(undefined);
  useEffect(() => {
    fetchForm(props.id, setForm);
    fetchFormFields(props.id, setFormFieldsState);
  }, []);
  if (form === undefined) {
    return <NotFound name="PREVIEW" />;
  }
  return (
    <div className="flex-col justify-center align-middle text-center">
      <div className="text-xl font-bold m-4">{form.title}</div>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
        href={
          formFieldsState && formFieldsState.length > 0
            ? `/preview/${props.id}/1`
            : `/preview/${props.id}/no-fields`
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
                        Type
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {formFieldsState &&
                      formFieldsState.map((field, index) => (
                        <tr
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          key={index}
                        >
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {field.label}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {field.kind} {field.kind === "TEXT"}
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
