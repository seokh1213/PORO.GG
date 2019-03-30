import React, {useState, useContext} from 'react';
import {MyContext} from '../App';
import {Link} from 'react-router-dom';
import favoriteSVG from '../static/images/favorite.svg';
import preprocessingString from '../preprocessingString';
import {NORMAL_IMAGE_URL} from '../StaticData';
import './Home.css';

const Home=({summonerName, region, search})=> {
  const imageStyle=search?{display:'none'}:{};
  const {setSummonerInfo, favoriteList}=useContext(MyContext);
  const [inputValue, setInputValue]=useState(summonerName);
  const [newRegion, setNewRegion]=useState(region);
  const regions=[{value:'KR', text:'KR'},{value:'JP1', text:'JP'},{value:'NA1', text:'NA'},{value:'EUW1', text:'EUW'},
                 {value:'EUN1', text:'EUN'},{value:'RU', text:'RU'},{value:'OC1', text:'OC'},{value:'BR1', text:'BR'},
                 {value:'TR1', text:'TR'},{value:'LA1', text:'LAN'},{value:'LA2', text:'LAS'}];

  const handleSubmit = e =>{
    if(inputValue!=="" && (e.keyCode === 13 || e.type==='click')) {
      setSummonerInfo(preprocessingString(inputValue), newRegion);
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
      <img title='Happy poro!' alt='Happy poro!' src={NORMAL_IMAGE_URL} id="mainImage" style={imageStyle}/>
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
      {
        search?'':
          <div className="favoriteTags">
          {
            Object.entries(favoriteList).map(ele=>{
            return (
              <Link className="favoriteTag" key={ele[0]} to={`/summoner/${ele[1]}/${ele[0]}`} replace>
                <img className="starSVG" src={favoriteSVG} alt="Star svg" />
                {ele[0]}
              </Link>
              );
           })
          }
          </div>
      }
    </div>
  );
  
}

export default Home;
