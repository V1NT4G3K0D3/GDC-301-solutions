import React from "react";
import Header from "./components/Header";
import AppContainer from "./components/AppContainer";
import DefaultPage from "./components/DefaultPage";

function App() {
  return (
    <AppContainer>
      <div className="container  p-4 w-2/5  mx-auto m-10  bg-white shadow-lg rounded-xl">
        <Header title={"Welcome to #react-typescript with #tailwindcss"} />
        <DefaultPage />
      </div>
    </AppContainer>
  );
}

export default App;
