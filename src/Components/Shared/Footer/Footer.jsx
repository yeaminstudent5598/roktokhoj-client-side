
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-700 text-base-content mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 1: About */}
          <div>
            <h2 className="text-xl font-bold mb-3">About Us</h2>
            <p className="text-sm">
              YourCompany is dedicated to providing the best products and services to our customers. We value innovation and excellence.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="link link-hover">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="link link-hover">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="link link-hover">
                  Contact
                </a>
              </li>
              <li>
                <a href="/blog" className="link link-hover">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Social Media */}
          <div>
            <h2 className="text-xl font-bold mb-3">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-xl text-blue-600 hover:text-blue-800">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-xl text-blue-400 hover:text-blue-600">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-xl text-pink-500 hover:text-pink-700">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-xl text-blue-700 hover:text-blue-900">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
