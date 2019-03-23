import React, {useState, useContext} from 'react';
import {MyContext} from '../App';
const ERROR_IMAGE_URL="https://www.pngkey.com/png/full/43-431793_shock-emoji-png.png";
const NORMAL_IMAGE_URL="https://www.pngkey.com/png/full/280-2801795_cartoon-tongue-png.png";

const MainContent=({error})=> {
  const {summonerName, setSummonerName}=useContext(MyContext);
  const [inputValue, setInputValue]=useState(summonerName);
  const imageInfo=error?'Sad poro...':'Happy poro!';
  const [NORMAL_STYLE, ERROR_STYLE]=error?[{display:'none'},{}]:[{},{display:'none'}];

  const handleSubmit = e =>{
    if(inputValue!=="" && (e.keyCode === 13 || e.type==='click')) {
      const regExp=/[^(a-zA-Z0-9)]/gi;
      setInputValue(inputValue.replace(regExp, ""));
      setSummonerName(inputValue.replace(regExp, ""));
    }
    e.preventDefault();
  }
  const handleChange = e =>{
    setInputValue(e.target.value);
  }
  return (
    <div className="MainContent">
      <img title={imageInfo} alt={imageInfo} src={NORMAL_IMAGE_URL} id="mainImage" style={NORMAL_STYLE}/>
      <img title={imageInfo} alt={imageInfo} src={ERROR_IMAGE_URL} id="mainImage" style={ERROR_STYLE}/>
      <div id="inputForm">
        <input 
          name="userName" 
          type="text" 
          value={inputValue}
          onChange={handleChange} 
          onKeyUp={handleSubmit} 
          className="idInput" 
          placeholder="소환사 명, 소환사명, ..." 
          autoComplete="off"/>
        <button type="button" className="inputButton" onClick={handleSubmit}>.GG</button>
      </div>
    </div>
  );
  
}

export default MainContent;
