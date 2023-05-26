import { useEffect, useState } from "react";
import Loader from "react-loaders";
import { collection, getDocs } from "firebase/firestore";
import AnimatedLetters from "../AnimatedLetters";
import { db } from "../../firebase";
import "./index.scss";

const Project = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    setProjects(querySnapshot.docs.map((doc) => doc.data()));
  };

  const renderData = (projects) => {
    return (
      <div className="images-container">
        {projects.map((project, idx) => {
          return (
            <div className="image-box" key={idx}>
              <img
                className="project-image"
                src={project.image}
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
        <div>{renderData(projects)}</div>
      </div>
      <Loader type="ball-rotate" />
    </>
  );
};

export default Project;
