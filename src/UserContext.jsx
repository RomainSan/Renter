import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";
export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscibre = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });
    return unsubscibre;
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, navigate }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
