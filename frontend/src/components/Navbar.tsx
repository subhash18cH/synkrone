import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/src/assets/img.png";

interface NavLink {
  href: string;
  text: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks: NavLink[] = [
    { href: "#how-it-works", text: "How it works" },
    { href: "#partners", text: "Partner" },
    { href: "#FAQ", text: "FAQ" },
  ];

  return (
    <nav className="w-full bg-white fixed z-20">
      <div className="px-4 sm:px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <img className="h-10 sm:h-14" src={logo} alt="logo" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-transparent bg-clip-text">
              FlowHive
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:bg-yellow-100 text-yellow-500 font-semibold rounded-md py-2 px-3 transition-colors"
              >
                <span>{link.text}</span>
              </a>
            ))}
            <Link
              to="/signup"
              className="hover:bg-yellow-100 text-yellow-500 font-semibold rounded-md py-2 px-3 transition-colors"
            >
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-yellow-500 p-2 hover:bg-yellow-100 rounded-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block hover:bg-yellow-100 text-yellow-500 font-semibold rounded-md py-2 px-3 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.text}</span>
              </a>
            ))}
            <Link
              to="/signup"
              className="block hover:bg-yellow-100 text-yellow-500 font-semibold rounded-md py-2 px-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
