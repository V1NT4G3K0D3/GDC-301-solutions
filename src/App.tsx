import React, { useEffect, useState } from "react";
import { User } from "./components/types/userTypes";
import { me } from "./components/Utils/apiUtils";
import AppRouter from "./router/AppRouter";

const getCurrentUser = async (
  setCurrentUserCB: (currentUser: User) => void
) => {
  const currentUser = await me();
  setCurrentUserCB(currentUser);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return <AppRouter currentUser={currentUser} />;
}

export default App;
