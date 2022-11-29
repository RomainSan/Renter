import { useState } from "react";
import { MdClose } from "react-icons/md";
import { auth, db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
export default function SignUp({ setSignUpModal }) {
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName,
          });
          await setDoc(doc(db, "users", userAuth.user.uid), {
            email: email,
            username: displayName,
          });
        })
        .then(setSignUpModal(false));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="fixed w-full h-screen bg-greyRgba"
        onClick={() => setSignUpModal(false)}
      ></div>
      <div className="signin shadow-xl bg-white rounded-lg p-10">
        <div className="flex items-center mb-5 justify-between text-primary">
          <h2 className="font-bold text-xl">Sign Up</h2>
          <button onClick={() => setSignUpModal(false)}>
            <MdClose size="30px" />
          </button>
        </div>
        <form
          name="text"
          className="flex flex-col"
          onSubmit={(e) => handleSignUp(e)}
        >
          <input
            className="py-3 px-2 rounded my-2 border"
            type="text"
            placeholder="firstname"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            className="py-3 px-2 rounded my-2 border"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="py-3 px-2 rounded my-2 border"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary text-white py-3 px-5 my-2 rounded hover:bg-primaryLight duration-500 ease-in-out">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
