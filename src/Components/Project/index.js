import { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import projectData from "../../Data/project.json";

const Project = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  const renderData = (projects) => {
    return (
      <div className="images-container">
        {projects.map((project) => {
          return (
            <div className="image-box" key={project.idx}>
              <img
                className="project-image"
                src={project.cover}
                alt={project.title}
              />
              <div className="content">
                <p className="title">{project.title}</p>
                <h4 className="description"> {project.description} </h4>
                <button
                  className="btn"
                  onClick={() => window.open(project.url)}
                >
                  VIEW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="container projects-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={["P", "r", "o", "j", "e", "c", "t", "s"]}
            idx={15}
          />
        </h1>
        <div>{renderData(projectData.projects)}</div>
      </div>
      <Loader type="ball-rotate" />
    </>
  );
};

export default Project;
