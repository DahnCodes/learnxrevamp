import { Link, Outlet, useNavigate } from "react-router-dom";
// import { FaEnvelope, FaFacebook, FaTwitter } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";

import { FaArrowRightLong, FaPhone, FaXTwitter } from "react-icons/fa6";
import "./App.css";
import Learnx from "./assets/Learnx.png";
import logo from "./assets/logo.png";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaBars, FaEnvelope, FaTimes } from "react-icons/fa";
import { useState } from "react";
// import LearnXF from "./assets/LearnXF.png";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const navigate = useNavigate();
  return (
    <div className="Navcon">
        <div className="header-container">
      <nav className="Header">
        <img src={Learnx} alt="LearnX Logo" className="Img1" />

        {/* Desktop Navigation */}
        <ul className="desktop-nav">
          <li>
            <Link to="/about" className="nav_link_top">
              About Us
            </Link>
          </li>
          <li>
            <Link to="#" className="nav_link_top">
              Category
            </Link>
          </li>
          <li>
            <Link to="#" className="nav_link_top">
              Testimonial
            </Link>
          </li>
          <li>
            <Link to="/" className="nav_link_top">
              FAQs
            </Link>
          </li>
        </ul>

        <div className="butdiv1">
          <button className="But1" onClick={() => navigate("/signin")}>
            Login
          </button>
          <button className="But2" onClick={() => navigate("/signup")}>
            Register <FaArrowRightLong />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/about" className="nav_link_top" onClick={toggleMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="nav_link_top" onClick={toggleMenu}>
                Category
              </Link>
            </li>
            <li>
              <Link to="#" className="nav_link_top" onClick={toggleMenu}>
                Testimonial
              </Link>
            </li>
            <li>
              <Link to="/" className="nav_link_top" onClick={toggleMenu}>
                FAQs
              </Link>
            </li>
          </ul>
          <div className="mobile-buttons">
            <button className="But1" onClick={() => navigate("/signin")}>
              Login
            </button>
            <button className="But2" onClick={() => navigate("/signup")}>
              Register <FaArrowRightLong />
            </button>
          </div>
        </div>
      </nav>
    </div>

      <Outlet />

      <footer className="footer-container">

        <div className="footer">
        <div
          className="footer-section"
          id="footer-sectionlogo-section"
        >
          <div className="footerp">
            <img src={logo} alt="LearnX Logo" className="footer-logo" />
            <h2>LearnX</h2>
          </div>
          <p className="footer-text">
            At LearnX, we are committed to success in everything we do.
            Therefore, the success of our interns is paramount as it is
            also how we are perceived.
          </p>
          <div className="footer-icons">
            <div className="footer-contact">
              <FaPhone className="icon" />
              <span>+234 814 012 0539</span>
            </div>
            <div className="footer-contact">
              <FaEnvelope className="icon" />
              <span>LearnX@LearnX.NG</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">About us</Link>
            </li>
            <li>
              <Link to="#">Courses</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Career</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <Link to="#">FAQs</Link>
            </li>
            <li>
              <Link to="#">Help Centre</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h3>Socials</h3>
          <div className="social-icons">
            <Link to="#">
            <LuFacebook />

            </Link>
            <Link to="#">
            <LuInstagram />

            </Link>
            <Link to="#">
            <FaXTwitter />

            </Link>
            <Link to="#">
            <SlSocialLinkedin />

            </Link>
          </div>
        </div>

        </div>

        <div className="footer-border">
          <div className="lines"></div>
          <div className="line-text">
            <p>LearnX</p>
            <p>&copy; 2025 LearnX. All rights reserved.</p>
          </div>
        </div>


      </footer>

      {/* <footer>
                <nav>
                    <div>
                        <h4>LearnX</h4>
                        <p>At learnX we are committed to success in everything we</p>
                        <p>do. Therefore the success of our interns is paramount as</p>
                        <p>it is also how we are percieved.</p>
                        <div>
                        <FaFacebookF />
                        <FaInstagram />
                        <BsTwitter />
                        <SlSocialLinkedin />

                        </div>
                        <p><FaPhone />+234 814 012 0539</p>
                        <p><BiSolidMessageAltDetail />LearnX@LearnX.NG</p>
                    </div>

                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>

                            <li>
                            <Link to="#">About Us</Link>
                            </li>
                            <li>
                            <Link to="#">About Us</Link>
                            </li>
                            <li>
                            <Link to="#">Courses</Link>
                            </li>

                            <li>
                            <Link to="#">Contact Us</Link>
                            </li>

                            <li>
                            <Link to="#">career</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4>support</h4>
                        <ul>
                            <li><Link to="#">FAQs</Link></li>
                            <li>
                            <Link to="#">Help caenter</Link>
                            </li>

                            <li>
                            <Link to="#">Privacy policy</Link>
                            </li>

                            <li>
                            <Link to="#">Terms and Conditions</Link>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
            </footer> */}
    </div>
  );
}
export default Layout;
