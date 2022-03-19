import React from "react";
import Header from "./components/Header";
import AppContainer from "./components/AppContainer";
import FormElements from "./components/FormElements";

const formFields = [
  { label: "First Name", id: 1, type: "text" },
  { label: "Last Name", id: 2, type: "text" },
  { label: "Email", id: 3, type: "email" },
  { label: "DOB", id: 4, type: "date" },
  { label: "Phone number", id: 5, type: "number" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title={"Welcome to #react-typescript with #tailwindcss"} />
        <FormElements formFields={formFields} />
      </div>
    </AppContainer>
  );
}

export default App;
