import React, { useEffect, useState } from "react";
import { MultiValueFields, Answers } from "../Utils/interfaces";

function MultiSelectPreviewField(props: {
  answers: Answers;
  fieldId: number;
  currentField: MultiValueFields;
  changeValueCB: (e: string | string[], id: number) => void;
}) {
  const [options, setOptions] = useState(
    props.currentField.options.map((option, index) => ({
      id: index,
      option,
      selected: false,
    }))
  );

  useEffect(() => {
    props.changeValueCB(
      options.map((option) => option.option),
      props.fieldId
    );
  }, [options, props]);

  return (
    <div>
      <div className="min-h-screen p-10 bg-gray-100">
        <div className="max-w-md mx-auto">
          <label className="font-semibold block py-2">Select Input:</label>

          <div className="relative">
            <div className="h-fit bg-blue-600 flex flex-wrap  border-gray-200 rounded items-center">
              {options.map((option) => {
                if (option.selected) {
                  return (
                    <div
                      className="cursor-pointer group"
                      onClick={() =>
                        setOptions(
                          options.map((o) => {
                            if (o.id === option.id) {
                              return { ...o, selected: false };
                            }
                            return o;
                          })
                        )
                      }
                    >
                      <div className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                        {option.option}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <input
              type="checkbox"
              name="show_more"
              id="show_more"
              className="hidden peer"
              checked
            />
            <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
              {options.map((option) => {
                if (!option.selected) {
                  return (
                    <div
                      className="cursor-pointer group"
                      onClick={() =>
                        setOptions(
                          options.map((o) => {
                            if (o.id === option.id) {
                              return { ...o, selected: true };
                            }
                            return o;
                          })
                        )
                      }
                    >
                      <div className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                        {option.option}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiSelectPreviewField;
