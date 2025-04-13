// src/components/Header.jsx
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";

export default function Header() {
  return (
    <header className="bg-third-color text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">THE GAFFER</h1>
      <nav className="flex-1 flex justify-center space-x-6 text-sm font-medium">
        <a href="#" className="text-yellow-400">Home</a>
        <a href="#">The League</a>
        <a href="#">The Market</a>
        <a href="#">Get Packs</a>
        <a href="#">Whitepaper</a>
        <a href="#">Blog</a>
      </nav>
      <div className="flex items-center space-x-4">
        <FaDiscord className="w-5 h-5" />
        <FaTwitter className="w-5 h-5" />
        <BsQuestionCircle className="w-5 h-5" />
        <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md">
          PLAY NOW
        </button>
      </div>
    </header>
  );
}
