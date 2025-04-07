import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Learnx from "./assets/Learnx.png";
import Userx from "./assets/Userx.png";
import profile from "./assets/profile.png";
import { CiSearch } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { LuPhoneCall } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import "./Dashlayout.css";
import { IoIosNotifications } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  if(!isAuthenticated) {
    navigate("/signin");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="dashlayout_container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div className="mobile-logo">
          <img src={Learnx} alt="LearnX Logo" className="topimg" />
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`Sidebar1 ${isMenuOpen ? 'open' : ''}`}>
        <div className="TOP1">
          <div className="Top1a">
            <img src={Learnx} alt="LearnX Logo" className="topimg3" />
            <img src={Userx} alt="UserX Logo" className="topimg" />
          </div>
          <div className="Top1b">
            <img src={profile} alt="Profile" className="imgtopb" />
            <div className="Top1b__text">
              <h4>{user?.firstname} {user?.track?.toUpperCase() || 'PD'}</h4>
              <p>{user?.email}</p>
            </div>
          </div>
          {/* <div className="Top1c">
            <input type="text" placeholder="Search" />
            <CiSearch className="searchimg" />
          </div> */}
        </div>
        
        <div className="Middle1">
          <ul>
            <li onClick={closeMenu}>
              <Link to="/dashboard" className={`linkTag ${location.pathname === "/dashboard" ? "selected" : ""}`}>
                <MdSpaceDashboard /> Dashboard
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/courses" className={`linkTag ${location.pathname === "/courses" ? "selected" : ""}`}>
                <IoBookSharp /> My Courses
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/mentors" className={`linkTag ${location.pathname === "/mentors" ? "selected" : ""}`}>
                <IoPersonAddSharp /> Mentors
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/paymentModal" className={`linkTag ${location.pathname === "/paymentModal" ? "selected" : ""}`}>
                <MdOutlinePayment /> Payments
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/Certificate" className={`linkTag ${location.pathname === "/Certificate" ? "selected" : ""}`}>
                <PiCertificateFill /> Certification
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/" className={`linkTag ${location.pathname === "/" ? "selected" : ""}`}>
                <LuPhoneCall /> Support
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="Bottom1">
          <ul>
            <li onClick={closeMenu}>
              <TbLogout2 /> Logout
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`maindash ${isMenuOpen ? 'menu-open' : ''}`}>
        <header className="headerdash">
          <nav className="navinputdash">
            <div className="searchdash1">
              <input type="text" placeholder="Search" />
              <CiSearch className="searchicon"/>
            </div>
            <div className="notificationdash">
              <IoIosNotifications />
              <IoMdPerson />
              <p>{user?.firstname}</p>
              <IoMdArrowDropdown />
            </div>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;