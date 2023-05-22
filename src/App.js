import { Route, Routes } from "react-router-dom";
import Layout from './Components/Layout'
import "./App.scss";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
