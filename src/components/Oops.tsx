import React from "react";
import { navigate } from "raviger";

function Oops(props: { value: string; id: number }) {
  return (
    <div className="flex-col justify-center align-middle text-center">
      <main className="h-64 w-full flex flex-col justify-center items-center bg-sky-100 rounded-lg">
        <h1 className="text-9xl font-extrabold text-sky-300 tracking-widest">
          204
        </h1>
        <div className="bg-sky-500 text-white px-2 text-sm rounded rotate-12 absolute">
          {props.value}
        </div>
      </main>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-lg"
        onClick={() => navigate(`/forms/${props.id}`)}
      >
        Edit the form
      </button>
    </div>
  );
}

export default Oops;
