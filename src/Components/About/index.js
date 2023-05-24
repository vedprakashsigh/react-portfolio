import { useEffect, useState } from "react";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import CSS from "../../assets/images/css3.png";
import JS from "../../assets/images/javascript.png";
import HTML from "../../assets/images/html5.png";
import PY from "../../assets/images/python.png";
import GIT from "../../assets/images/git.png";
import REACT from "../../assets/images/react.png";
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
            Hi there! My name is Ved Prakash and I'm a passionate Developer. I
            have a passion for Web Development and love creating Websites.
          </p>
          <p>
            I am currently studing Bachelor of Technology (BTech) at Birla
            Institute of Technology, Mesra. Uptil now, I have worked with
            ReactJS development and Python Development using a variety of
            projects, including a Movie App using an API to fetch the
            information of various movies. Through these experiences, I have
            developed a strong skill set in HTML, CSS, JS, ReactJS, Python.
          </p>
          <hr />
          <div className="skills">
            <h2>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={["S", "k", "i", "l", "l", "s"]}
                idx={15}
              />
            </h2>
            <p>
              Expert in front-end development including technologies like
              <span class="tech-tag"> Python</span>,
              <span class="tech-tag"> HTML5</span>,
              <span class="tech-tag"> CSS3</span>,
              <span class="tech-tag"> JavaScript</span>,
              <span class="tech-tag"> React</span>,
              <span class="tech-tag"> TypeScript</span>,
              <span class="tech-tag"> C/C++</span>,
              <span class="tech-tag"> Bootstrap</span>,
              <span class="tech-tag"> Git</span>, etc.
            </p>
            <p>
              Despite not being a designer, I have a keen eye for beauty and
              experience in responsive, mobile-first site design. I make a great
              effort to ensure the best user experience in my programming. I
              would be happy to help you in any way, even after the assignment
              is finished. I promise to keep my word while working on your
              assignment.
            </p>
          </div>
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
      <Loader type="ball-rotate" />
    </>
  );
};

export default About;
