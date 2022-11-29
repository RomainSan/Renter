import React from "react";
import { auth } from "../firebase.config";
import { UserContext } from "../UserContext";
import { signOut } from "firebase/auth";
import { useContext } from "react";
export default function Account() {
  const { navigate, currentUser } = useContext(UserContext);
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert("error");
    }
  };

  return (
    <div className="text-white">
      <p>{currentUser.uid}</p>
      <p>{currentUser.email}</p>
      <p>{currentUser.displayName}</p>
      <button className="bg-red-500 p-3 rounded" onClick={() => logOut()}>
        Log out
      </button>
    </div>
  );
}
