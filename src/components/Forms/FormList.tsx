import React, { useState } from "react";
import { createNewForm, getLocalForms } from "../Utils/localStorageUtils";
import { FormListItem } from "./FormListItem";
import { navigate, useQueryParams } from "raviger";

export const FormList = () => {
  const [{ search }, setQueryParams] = useQueryParams();
  const [searchString, serSearchString] = useState("");

  return (
    <div className="flex-col flex justify-center">
      <div className="flex justify-center text-center">
        {/* <form action="/forms" method="GET"> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQueryParams({ search: searchString });
          }}
        >
          <input
            type="text"
            className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1 w-full h-auto"
            value={searchString}
            name="search"
            onChange={(e) => {
              serSearchString(e.target.value);
            }}
            placeholder="Search for a form"
          />
        </form>
        <button
          className="text-center h-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 mx-2 rounded-lg"
          onClick={() => {
            let form = createNewForm();
            navigate(`/forms/${form.id}`);
          }}
          // href="/forms/0" with <a> tag
        >
          + Create new form
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {getLocalForms()
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => (
            <FormListItem key={form.id} form={form} />
          ))}
      </div>
    </div>
  );
};
