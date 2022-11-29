import image from "./assets/img/img.webp";
import { Link, NavLink } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function Card({ data, id }) {
  const [note, setNote] = useState();

  useEffect(() => {
    data.rating.length > 0
      ? setNote(
          Math.round(
            data.rating.reduce((a, b) => {
              return a + b;
            }) / data.rating.length
          )
        )
      : setNote("new !");
  }, [data.rating]);
  return (
    <Link to={`/${id}`}>
      <div className="cursor-pointer max-w-sm mx-auto capitalize rounded-xl bg-greyRgba hover:shadow-2xl ease-in duration-200">
        <div className="text-white ">
          <img
            src={image}
            alt="flores de cunha"
            className="h-80 rounded-xl shadow-md object-cover transition duration-300"
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <h3 className="text-lg text-white">
              {data.city}, {data.country}
            </h3>
            <div className="flex items-center gap-1 text-white">
              {data.rating.length > 0 && (
                <small>({data.rating.length} avis)</small>
              )}
              <p>{note}</p>
              <AiFillStar className="text-amber-500" />
            </div>
          </div>
          <p className="text-stone-300">{data.added}</p>
          <div className="flex text-stone-300 items-center gap-x-2">
            <p>{data.space} guests</p>
          </div>
          <p className="py-1 text-white">${data.price} per night</p>
        </div>
      </div>
    </Link>
  );
}
