import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import MessageModal from "./MessageModal";
import { UserContext } from "../UserContext";

export default function Detail() {
  const { currentUser } = useContext(UserContext);
  const [messageModal, setMessageModal] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const detail = async () => {
      const detailRef = await getDocs(collection(db, "properties"));
      const result = detailRef.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item) => item.id === id);
      setData(result[0]);
    };
    detail();
  }, [id]);

  return (
    <div className="px-12 pt-36 max-w-7xl mx-auto">
      <img src="" alt="" className="h-96 w-full" />
      <div className="mt-12 text-white">
        <div className="mb-5 bg-greyRgba p-5 rounded-md flex justify-between">
          <div className="">
            <h2 className="font-bold text-lg">{data.city}, {data.country}</h2>
            <p>{data.space} guests </p>
            <p>by {data.userName}</p>
          </div>
          <div className="flex self-center items-center gap-x-10">
            <p>${data.price} / per night</p>
            <button className="bg-error px-4 py-3 rounded">Book</button>
          </div>
        </div>
        <div className="p-5 ">
          <p>{data.description}</p>
        </div>
      </div>
      <>
        {currentUser.uid !== data.userId && (
          <>
            <button
              className="bg-error text-white py-2 px-4 rounded"
              onClick={() => setMessageModal(!messageModal)}
            >
              Contacter {data.userName}
            </button>
            {messageModal && (
              <MessageModal
                setMessageModal={setMessageModal}
                ownerId={data.userId}
                ownerName={data.userName}
              />
            )}
          </>
        )}
      </>
    </div>
  );
}
