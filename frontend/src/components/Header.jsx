// src/components/Header.jsx
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header({ LoginStatus }) {

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("formationData");
    window.location.reload();
  }
  return (
    <header className="bg-third-color text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">THE GAFFER</h1>
      <nav className="flex-1 flex justify-center space-x-6 text-sm font-light mr-40">
        <Link to="/" className="text-yellow-400">Home</Link>
        {!LoginStatus ? (
          <Link to="/login">Login now</Link>
        ) : (
          <button onClick={handlelogout}>Logout</button>
        )}
        <Link to="/formation">Formation Lab</Link>
      </nav>
      <div className="flex items-center space-x-4">
       
      </div>
    </header>
  )
}
