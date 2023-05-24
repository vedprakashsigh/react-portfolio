import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import Home from "../../assets/images/home.png";
import About from "../../assets/images/about.png";
import Project from "../../assets/images/project.png";
import Contact from "../../assets/images/contact.png";
import Ham from "../../assets/images/hamburger.png";
import Cross from "../../assets/images/cross.png";
import LinkedIn from "../../assets/images/linkedin.png";
import GitHub from "../../assets/images/github.png";
import Instagram from "../../assets/images/instagram.png";
import Mail from "../../assets/images/gmail.png";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <nav className={showNav ? "mobile-show" : ""}>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <img src={Home} alt="Home" width={30} />
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/about"
          className="about-page"
          onClick={() => setShowNav(false)}
        >
          <img src={About} alt="About" width={30} />
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/project"
          className="project-page"
          onClick={() => setShowNav(false)}
        >
          <img src={Project} alt="Project" width={30} />
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/contact"
          className="contact-page"
          onClick={() => setShowNav(false)}
        >
          <img src={Contact} alt="Contact" width={30} />
        </NavLink>
        <img
          src={Cross}
          width={40}
          className="cross-icon"
          onClick={() => setShowNav(false)}
        />
      </nav>

      <ul>
        <li>
          <Link to="https://www.linkedin.com/in/vedprakashsigh" target="_blank">
            <img src={LinkedIn} alt="LinkedIn" width={20} />
          </Link>
        </li>
        <li>
          <Link to="https://www.github.com/vedprakashsigh" target="_blank">
            <img src={GitHub} alt="GitHub" width={20} />
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/vedprakashsigh" target="_blank">
            <img src={Instagram} alt="Instagram" width={20} />
          </Link>
        </li>
        <li>
          <Link to="mailto:vedprakashsigh@gmail.com" target="_blank">
            <img src={Mail} alt="Mail" width={20} />
          </Link>
        </li>
      </ul>
      <img
        src={Ham}
        width={40}
        className="hamburger-icon"
        onClick={() => setShowNav(true)}
      />
    </div>
  );
};

export default Sidebar;
