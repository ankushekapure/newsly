import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { HashRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  // Local Environment Variable for the News API key
  const apiKey = process.env.REACT_APP_NEWS_API;

  // State to track the progress of the loading bar
  const [progress, setProgress] = useState(0);

  return (
    // Initialize the React Router BrowserRouter
    <HashRouter>
      {/* Display the Navbar component */}
      <div className='mainContainer'>
      <div className="container">
      <Navbar/>
      {/* Display the loading bar with custom settings */}
      <LoadingBar
        color='#007bff'
        height={5}
        progress={progress}
      />
      {/* Define the routes for different news categories */}
      <Routes>
        {/* Route for displaying all news */}
        <Route path="/" element={<News setProgress={setProgress} apikey={apiKey} key="all" country="in" pgsize={6} />} />
        {/* Route for displaying business news */}
        <Route path="/business" element={<News setProgress={setProgress} apikey={apiKey} key="business" country="in" pgsize={6} category="business" />} />
        {/* Route for displaying entertainment news */}
        <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apiKey} key="entertain" country="in" pgsize={6} category="entertainment" />} />
        {/* Route for displaying general news */}
        <Route path="/general" element={<News setProgress={setProgress} apikey={apiKey} key="general" country="in" pgsize={6} category="general" />} />
        {/* Route for displaying health news */}
        <Route path="/health" element={<News setProgress={setProgress} apikey={apiKey} key="health" country="in" pgsize={6} category="health" />} />
        {/* Route for displaying science news */}
        <Route path="/science" element={<News setProgress={setProgress} apikey={apiKey} key="science" country="in" pgsize={6} category="science" />} />
        {/* Route for displaying sports news */}
        <Route path="/sports" element={<News setProgress={setProgress} apikey={apiKey} key="sports" country="in" pgsize={6} category="sports" />} />
        {/* Route for displaying technology news */}
        <Route path="/technology" element={<News setProgress={setProgress} apikey={apiKey} key="tech" country="in" pgsize={6} category="technology" />} />
      </Routes>
      </div>
      </div>
    </HashRouter>
  )
}

export default App;
