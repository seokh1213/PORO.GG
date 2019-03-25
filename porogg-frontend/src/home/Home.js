import React, {useState, useContext} from 'react';
import {MyContext} from '../App';
import './Home.css';
const NORMAL_IMAGE_URL="https://www.pngkey.com/png/full/280-2801795_cartoon-tongue-png.png";

const Home=({summonerName, region, search})=> {
  const imageStyle=search?{display:'none'}:{};
  const {setSummonerInfo}=useContext(MyContext);
  const [inputValue, setInputValue]=useState(summonerName);
  const [newRegion, setNewRegion]=useState(region);
  const regions=[{value:'KR', text:'KR'},{value:'JP1', text:'JP'},{value:'NA1', text:'NA'},{value:'EUW1', text:'EUW'},
                 {value:'EUN1', text:'EUN'},{value:'RU', text:'RU'},{value:'OC1', text:'OC'},{value:'BR1', text:'BR'},
                 {value:'TR1', text:'TR'},{value:'LA1', text:'LAN'},{value:'LA2', text:'LAS'}];

  const handleSubmit = e =>{
    if(inputValue!=="" && (e.keyCode === 13 || e.type==='click')) {
      const regExp=/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      setInputValue(inputValue.replace(regExp, ""));
      setSummonerInfo(inputValue.replace(regExp, ""), newRegion);
    }
    e.preventDefault();
  }
  const handleChange = e =>{
    setInputValue(e.target.value);
    e.preventDefault();
  }
  const handleSelect=e=>{
    setNewRegion(e.target.value);
    e.preventDefault();
  }
  return (
    <div className="Home">
      {/*<img title={imageInfo} alt='Happy poro!' src={NORMAL_IMAGE_URL} id="mainImage" style={imageStyle}/>*/}
      <img title='Happy poro!' alt='Happy poro!' src={''} id="mainImage" style={imageStyle}/>
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
        <select onChange={handleSelect} value={newRegion}>
          {regions.map(data=>(<option value={data.value} key={data.value}>{data.text}</option>))}
        </select>
        <button type="button" className="inputButton" onClick={handleSubmit}>.GG</button>
      </div>
    </div>
  );
  
}

export default Home;
