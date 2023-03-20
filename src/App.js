import React from 'react';
import './App.css';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';

function App() {
  return (
    <div className="app">
    <Nav />
    <Banner />
     <Row title="Trending Now" 
     category="trending"
     isLargeRow
     />
     <Row title="Top Rated" category="top_movies"/>
     <Row title="Action Movies" category="action_movies"/>
     <Row title="Comedy Movies" category="comedy_movies"/>
     <Row title="Horror Movies" category="horror_movies"/>
     <Row title="Romance Movies" category="romance_movies"/>
     <Row title="Documentaries" category="documentaries"/>
    </div>
  );
}

export default App;
