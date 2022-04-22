import React from "react";

function NotFound(props: { name: string }) {
  return (
    <main className="h-64 w-full flex flex-col justify-center items-center bg-blue-100 rounded-lg">
      <h1 className="text-9xl font-extrabold text-blue-300 tracking-widest">
        404
      </h1>
      <div className="bg-blue-500 text-white px-2 text-sm rounded rotate-12 absolute">
        {props.name}: Not Found
      </div>
    </main>
  );
}

export default NotFound;
