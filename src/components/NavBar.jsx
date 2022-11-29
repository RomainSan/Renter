import { useContext, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { currentUser } = useContext(UserContext);
  const searchInput = useRef();
  const setSignInModal = () => {
    signUp && setSignUp(false);
    setSignIn(!signIn);
  };
  const setSignUpModal = () => {
    signIn && setSignIn(false);
    setSignUp(!signUp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchInput.current.value = "";
  };

  return (
    <>
      <nav className="bg-gray-900 p-4 drop-shadow-lg grid sm:grid-cols-2 md:grid-cols-3 items-center absolute w-full ">
        <Link to="/" className="mx-auto">
          <h1 className="text-error text-2xl font-bold hover:text-error1 duration-500">Renter</h1>
        </Link>
        <div className="hidden md:flex mx-auto ">
          <input
            className=" p-3 rounded-full border border-stone-200 drop-shadow-md px-4 capitalize outline-none pr-11"
            ref={searchInput}
          />
          <button
            className="relative bottom-0 right-10 text-white"
            onClick={(e) => handleSearch(e)}
          >
            <FiSearch
              color="#fff"
              className="bg-error rounded-full w-8 h-8 p-2"
            />
          </button>
        </div>
        <div className="flex gap-x-2 mx-auto items-center">
          {currentUser ? (
            <div className="text-error flex gap-5">
              <Link to="/" className="p-3 hover:text-error1 duration-500">
                Home
              </Link>
              <p className="p-3 select-none text-white ">|</p>
              <Link
                to="/profil"
                className=" cursor-pointer font-[500] select-none p-3 hover:text-error1 duration-500"
              >
                {currentUser.displayName}
              </Link>
              <Link to="message" className="p-3 hover:text-error1 duration-500">
                Messages
              </Link>
            </div>
          ) : (
            <>
              <div
                className="flex items-center rounded px-5 py-2 gap-x-2 bg-white text-error cursor-pointer font-[500]
			 select-none"
                onClick={() => setSignUpModal()}
              >
                <p>Sign Up</p>
              </div>
              <div
                className="flex items-center rounded px-5 py-2 gap-x-2 bg-error text-white cursor-pointer font-[500]
			      drop-shadow hover:drop-shadow-xl duration-500 ease-in-out select-none"
                onClick={() => setSignInModal()}
              >
                <p>Sign In</p>
                <AiOutlineUser />
              </div>
            </>
          )}
        </div>
      </nav>
      {signIn && <SignIn setSignInModal={setSignInModal} />}
      {signUp && <SignUp setSignUpModal={setSignUpModal} />}
    </>
  );
}
