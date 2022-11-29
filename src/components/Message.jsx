import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase.config";
import { UserContext } from "../UserContext";
import $ from "jquery";
export default function Message() {
  const { currentUser } = useContext(UserContext);
  const [messageUser, setMessageUser] = useState([]);
  const responseRef = useRef();
  const [mess, setMess] = useState([]);

  const showMessage = async (item) => {
    $(".named").removeClass("active");
    if ($("#" + item).hasClass("active")) {
      $("#" + item).removeClass("active");
    } else {
      $("#" + item).addClass("active");
    }

    const messRef = await getDocs(collection(db, "message"));
    const res = messRef.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((i) => i.id === item);
    setMess(res[0]);
  };

  useEffect(() => {
    const message = async () => {
      const messageRef = await getDocs(collection(db, "message"));
      const result = messageRef.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item) => item.senderId || item.owner === currentUser.uid);
      setMessageUser(result);
    };
    message();

  }, [currentUser.uid]);

  const handleSubmite = async (e, id) => {
    e.preventDefault();
    try {
      const newMessage = {
        message: responseRef.current.value,
        user: currentUser.uid,
        userName: currentUser.displayName,
      };
      const ref = await getDocs(collection(db, "message")).then((res) =>
        res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const filterRef = await ref.filter((mess) => mess.id === id);
      const messages = await filterRef.map((item) => item.data)[0];

      await updateDoc(doc(db, "message", id), {
        data: [...messages, newMessage],
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex max-w-6xl mx-auto max-h-screen pt-36 h-95v">
      {messageUser !== "" && (
        <>
          <div className="w-1/4 p-5">
            {messageUser.map((item, index) => (
              <div
                id={item.id}
                key={index}
                className="p-5 cursor-pointer border border-transparent hover:text-white ease-in duration-100 mb-2 named rounded-md"
                onClick={() => showMessage(item.id)}
              >
                <p key={index} className="text-white">
                  {item.senderId === currentUser.uid
                    ? item.ownerName
                    : item.senderName}
                </p>
              </div>
            ))}
          </div>
          {mess.data ? (
            <div className="w-3/4 bg-gray-900 p-5 rounded-md flex flex-col justify-between">
              <div id="messageDiv" className="overflow-auto">
                {mess.data?.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.user === currentUser.uid
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        item.user === currentUser.uid
                          ? "bg-blue-300 w-fit rounded-md p-4 my-3 max-w-xl"
                          : "bg-green-300 w-fit rounded-md p-4 my-3 max-w-xl"
                      }
                    >
                      <p className="text-left">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className="flex flex-col mt-5"
                onSubmit={(e) => handleSubmite(e, mess.id)}
              >
                <textarea
                  className="resize-none border border-blue-500 rounded-lg p-2"
                  ref={responseRef}
                />
                <button className="w-fit py-2 px-4 bg-error text-white rounded-md mt-2 self-end">
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="w-3/4 bg-gray-900 p-5 rounded-lg"></div>
          )}
        </>
      )}
    </div>
  );
}
