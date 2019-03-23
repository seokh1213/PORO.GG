import React from 'react';
import MainContent from './MainContent';

const Home=({error})=> {
  return (
    <div className="Home">
      <MainContent error={error}/>
    </div>
  );
}

export default Home;
