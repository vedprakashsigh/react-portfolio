import { Route, Routes } from "react-router-dom";
import Layout from './Components/Layout'
import "./App.scss";
import Home from "./Components/Home";
import About from "./Components/About";
import Project from "./Components/Project";
import Contact from "./Components/Contact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} /> 
          <Route path="about" element={<About/>} /> 
          <Route path="project" element={<Project/>} /> 
          <Route path="contact" element={<Contact/>} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
