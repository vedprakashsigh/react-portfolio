import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedLetters from "../AnimatedLetters";
import Logo from "../../assets/images/Logo.png";
import "./index.scss";

const Home = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const nameArray = ["V", "e", "d", " ", "P", "r", "a", "k", "a", "s", "h"];
  const jobArray = ["D", "e", "v", "e", "l", "o", "p", "e", "r"];

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>'m </span>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={nameArray}
            idx={15}
          />
          <br />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={26}
          />
        </h1>
        <h2>Frontend Developer | Python Expert</h2>
        <Link to="/contact" className="flat-btn">
          CONTACT ME
        </Link>
      </div>
      <div className='logo-container' >
        <img src={Logo} alt="Logo" className='solid-logo' />
    </div>
    </div>
  );
};

export default Home;
