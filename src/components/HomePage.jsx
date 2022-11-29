import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import Card from "./Card";

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const posts = async () => {
      const postRef = await getDocs(collection(db, "properties"));
      const result = postRef.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(result);
    };
    posts();
  }, []);

  return (
      <div className="pt-36 gap-4 flex flex-wrap justify-center">
        {data.map((item, index) => (
          <Card key={index} data={item} id={item.id} />
        ))}
      </div>
  );
}
