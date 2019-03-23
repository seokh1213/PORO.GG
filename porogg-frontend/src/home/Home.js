import React from 'react';
import MainContent from './MainContent';

const Home=({getInput})=> {
  return (
    <div className="Home">
      <MainContent getInput={getInput}/>
    </div>
  );
}

export default Home;
