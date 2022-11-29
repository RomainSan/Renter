import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import HomePage from "./components/HomePage";
import Message from "./components/Message";
import NavBar from "./components/NavBar";
import Profil from "./components/Profil";
export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="message" element={<Message />} />
      </Routes>
    </div>
  );
}
