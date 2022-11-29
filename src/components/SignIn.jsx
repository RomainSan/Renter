import { useContext, useRef } from "react";
import { MdClose } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { UserContext } from "../UserContext";

export default function SignIn({ setSignInModal }) {
  const { navigate } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // try sign in
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setSignInModal(false);
      navigate("/");
    } catch (error) {
      // message if incorrect password or email
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="fixed w-full h-screen bg-greyRgba"
        onClick={() => setSignInModal(false)}
      ></div>
      <div className="signin shadow-xl bg-white rounded-lg p-10">
        <div className="flex items-center mb-5 justify-between text-primary">
          <h2 className="font-bold text-xl">Sign In</h2>
          <button onClick={() => setSignInModal(false)}>
            <MdClose size="30px" />
          </button>
        </div>
        <form
          name="text"
          className="flex flex-col"
          onSubmit={(e) => handleSignIn(e)}
        >
          <input
            className="py-3 px-2 rounded my-2 border"
            type="email"
            placeholder="email"
            ref={emailRef}
          />
          <input
            className="py-3 px-2 rounded my-2 border"
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="bg-primary text-white py-3 px-5 my-2 rounded hover:bg-primaryLight duration-500 ease-in-out">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
