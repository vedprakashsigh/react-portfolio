import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import Home from "../../assets/images/home.png";
import About from "../../assets/images/about.png";
import Project from "../../assets/images/project.png";
import Contact from "../../assets/images/contact.png";
import LinkedIn from "../../assets/images/linkedin.png";
import GitHub from "../../assets/images/github.png";
import Instagram from "../../assets/images/instagram.png";
import Mail from "../../assets/images/gmail.png";
import Logo from '../../assets/images/Logo.png'

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src={Logo} alt="Logo"  />
      </Link>
      <nav>
        <NavLink exact="true" activeclassname="active" to="/">
          <img src={Home} alt="Home" width={30} />
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/about"
          className="about-page"
        >
          <img src={About} alt="About" width={30} />
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/project"
          className="project-page"
        >
          <img src={Project} alt="Project" width={30} />
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/contact"
          className="contact-page"
        >
          <img src={Contact} alt="Contact" width={30} />
        </NavLink>
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
    </div>
  );
};

export default Sidebar;
