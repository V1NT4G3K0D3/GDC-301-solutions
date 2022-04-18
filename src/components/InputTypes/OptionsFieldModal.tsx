import React, { useEffect, useState } from "react";
import { OptionsFields } from "../Utils/interfaces";

function DropdownModal(props: {
  field: OptionsFields;
  editOptionsCB: (id: number, value: string[]) => void;
  handleCloseModalCB: () => void;
}) {
  const [options, setOptions] = useState<string[]>(props.field.options);
  const [newOption, setNewOption] = useState<string>("");

  useEffect(() => {
    props.editOptionsCB(props.field.id, options);
  }, [options]);

  const addOption = () => {
    if (newOption) {
      setOptions([...options, newOption]);
      setNewOption("");
    } else {
      alert("Please enter a value");
    }
  };

  const removeOption = (option: string) => {
    setOptions(() => {
      options.indexOf(option) !== -1 &&
        options.splice(options.indexOf(option), 1);
      return options;
    });
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Edit options:
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="border-2 border-grey-200 rounded-lg p-2 my-2 flex-1"
                    value={newOption}
                    onChange={(e) => {
                      setNewOption(e.target.value);
                    }}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
                    onClick={addOption}
                  >
                    Add Option
                  </button>
                </div>
                <div className="mt-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex space-x-4 justify-between">
                      <p>{option}</p>
                      <button
                        className="text-md text-gray-500"
                        onClick={(_) => removeOption(option)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => props.handleCloseModalCB()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownModal;
