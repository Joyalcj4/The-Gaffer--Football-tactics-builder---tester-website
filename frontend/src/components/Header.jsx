// src/components/Header.jsx
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";

export default function Header({ LoginStatus }) {

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("formationData");
    window.location.reload();
  }
  return (
    <header className="bg-third-color text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">THE GAFFER</h1>
      <nav className="flex-1 flex justify-center space-x-6 text-sm font-medium mr-40">
        <a href="/" className="text-yellow-400">Home</a>
        {!LoginStatus ? (
          <a href="/login">Login now</a>
        ) : (
          <a onClick={handlelogout}>Logout</a>
        )}
        <a href="/formationlab">Formation Lab</a>

      </nav>
      <div className="flex items-center space-x-4">
       
      </div>
    </header>
  )
}
