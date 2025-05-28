import { FaGithub, FaInstagram, FaLinkedin, } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";

export default function Footer() {
const currentYear = new Date().getFullYear();
return (
    <footer className="bg-third-color text-white py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <a href="https://www.linkedin.com/in/joyalcj/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-yellow-400 hover:text-yellow-500 transition-colors" />
            </a>
            <a href="https://github.com/Joyalcj4/The-Gaffer--Football-tactics-builder---tester-website.git" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-yellow-400 hover:text-yellow-500 transition-colors" />
            </a>
            <a href="/faq" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                <BsQuestionCircle />
            </a>
        </div>
        <p className="text-sm">© {currentYear} The Gaffer. All rights reserved.</p>
    </footer>
)
}
