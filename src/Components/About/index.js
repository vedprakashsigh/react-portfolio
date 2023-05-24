import { useEffect, useState } from "react";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import CSS from '../../assets/images/css3.png';
import JS from '../../assets/images/javascript.png';
import HTML from '../../assets/images/html5.png';
import PY from '../../assets/images/python.png';
import GIT from '../../assets/images/git.png';
import REACT from '../../assets/images/react.png';
import Loader from "react-loaders";

const About = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  return (
    <>
    <div className="container about-page">
      <div className="text-zone">
        <h1>
          <AnimatedLetters
          letterClass={letterClass}
            strArray={["A", "b", "o", "u", "t", " ", "M", "e"]}
            idx={15}
          />
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, est
          corporis, ullam sequi, quos eveniet ea quis assumenda animi eius
          aspernatur?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, est
          corporis, ullam sequi, quos eveniet ea quis assumenda animi eius
          aspernatur?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, est
          corporis, ullam sequi, quos eveniet ea quis assumenda animi eius
          aspernatur?
        </p>
      </div>

      <div className="stage-cube-cont">
        <div className="cubespinner">
          <div className="face1">
            <img src={PY} alt="Python" />
          </div>
          <div className="face2">
            <img src={REACT} alt="React" />
          </div>
          <div className="face3">
            <img src={GIT} alt="GitHub" />
          </div>
          <div className="face4">
            <img src={CSS} alt="CSS3" />
          </div>
          <div className="face5">
            <img src={HTML} alt="HTML5" />
          </div>
          <div className="face6">
            <img src={JS} alt="JaveScript" />
          </div>
        </div>
      </div>
    </div>
    <Loader type="ball-rotate"/>
    </>
  );
};

export default About;
