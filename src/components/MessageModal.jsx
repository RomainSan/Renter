import { MdClose } from "react-icons/md";
import { UserContext } from "../UserContext";
import { useContext, useRef } from "react";
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";

export default function MessageModal({ setMessageModal, ownerId, ownerName }) {
  const { currentUser } = useContext(UserContext);
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "message"), {
        senderEmail: emailRef.current.value,
        senderId: currentUser.uid,
        senderName: currentUser.displayName,
        ownerName,
        ownerId,
        data: [
          {
            message: messageRef.current.value,
            user: currentUser.uid,
            userName: currentUser.displayName,
          },
        ],
      });
      emailRef.current.value = "";
      messageRef.current.value = "";
      setMessageModal(false)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-greyRgba"
        onClick={() => setMessageModal(false)}
      ></div>
      <div className="message shadow-xl bg-white rounded-lg p-10">
        <div className="flex justify-between mb-5">
          <h2 className="text-lg">Send Message</h2>
          <button onClick={() => setMessageModal(false)}>
            <MdClose size="30px" />
          </button>
        </div>
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email" className="text-stone-700">
            Sender
          </label>
          <input
            name="email"
            type="email"
            placeholder={currentUser.email}
            className="py-3 px-2 rounded my-2 border w-full"
            required
            ref={emailRef}
          />
          <label htmlFor="message" className="text-stone-700">
            Message
          </label>
          <textarea
            name="message"
            className="resize-none py-3 px-2 rounded my-2 border"
            cols="30"
            rows="10"
            required
            ref={messageRef}
          ></textarea>
          <button className="w-fit bg-error py-2 px-4 text-white rounded self-end">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
