import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import NoteState from './Context/Notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert message= "This is Alert check." />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
