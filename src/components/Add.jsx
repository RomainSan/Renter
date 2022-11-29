import { addDoc, collection } from "firebase/firestore";
import { useContext, useRef } from "react";
import { db } from "../firebase.config";
import { UserContext } from "../UserContext";
export default function Add() {
  const { currentUser } = useContext(UserContext);
  const titleRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const spaceRef = useRef();
  const typeRef = useRef();

  const handleSubmitPropertie = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "properties"), {
      title: titleRef.current.value,
      city: cityRef.current.value,
      country: countryRef.current.value,
      type: typeRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      space: spaceRef.current.value,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      rating: [],
    });
  };

  return (
    <form onSubmit={(e) => handleSubmitPropertie(e)} className="text-white">
      <h2 className="py-2">Title</h2>
      <input
        className="p-4 w-full rounded-md bg-greyRgba outline-none"
        ref={titleRef}
      />
      <h2 className="py-2">City</h2>
      <input
        className="p-4 w-full rounded-md- bg-greyRgba capitalize outline-none"
        ref={cityRef}
      />
      <h2 className="py-2">Country</h2>
      <input
        className="p-4 w-full rounded-md- bg-greyRgba capitalize outline-none"
        ref={countryRef}
      />
      <h2 className="py-2">Type</h2>
      <select className="p-4 w-full rounded-md bg-greyRgba" ref={typeRef}>
        <option value="appartement">Appartement</option>
        <option value="house">House</option>
        <option value="room">Room</option>
      </select>
      <h2 className="py-2">Description</h2>
      <textarea
        className="p-4 w-full rounded-md bg-greyRgba resize-none outline-none"
        ref={descriptionRef}
      />
      <h2 className="py-2">People</h2>
      <input
        type="number"
        className="p-4 w-full rounded-md bg-greyRgba outline-none"
        placeholder="1 - 2"
        ref={spaceRef}
      />
      <h2 className="py-2">Price / night</h2>
      <input
        type="number"
        placeholder="€"
        className="p-4 w-full rounded-md bg-greyRgba outline-none"
        ref={priceRef}
      />
      <h2 className="py-2">Pictures</h2>
      <input
        type="file"
        className="py-2 file:text-error file:bg-greyRgba file:border-0 file:py-3 file:px-4 file:rounded-full outline-none"
        accept="image/png, image/jpeg"
        multiple
      />
      <div className="mt-5">
        <h2 className="py-2">Available</h2>
        <p className="py-2">From :</p>
        <input
          type="date"
          className="p-4 w-full rounded-md bg-greyRgba outline-none"
        />
        <p className="py-2">To :</p>
        <input
          type="date"
          className="p-4 w-full rounded-md bg-greyRgba outline-none"
        />
      </div>
      <button className="bg-error text-white p-4 my-4 rounded-md w-full">
        Send
      </button>
    </form>
  );
}
