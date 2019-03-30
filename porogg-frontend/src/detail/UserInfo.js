import React, {useState, useContext} from 'react';
import unfavoriteSVG from '../static/images/unfavorite.svg';
import favoriteSVG from '../static/images/favorite.svg';
import {PROFILE_ICON_URL} from '../StaticData';
import {MyContext} from '../App';


const UserInfo=({data, region})=>{
  const {toggleFavoriteSummoner, favoriteList}=useContext(MyContext);
  const [favorite, setFavorite]=useState(favoriteList[data.summonerName]===region);
  return (
    <div className="profile">
      <img src={PROFILE_ICON_URL(data.profileIconId)} alt="Profile Icon" title={data.profileIconId} className="profileIcon"></img>
      <div className="info">
        <div className="name">{data.summonerName}</div>
        <div className="level">{data.summonerLevel} levels</div>
      </div>
      <div className="favorite">
        <span onClick={()=>{setFavorite(!favorite); toggleFavoriteSummoner(data.summonerName, region);}}>
          <img className="starSVG" src={favorite?favoriteSVG:unfavoriteSVG} alt="Star svg" />
          Favorites
        </span>
      </div>
    </div>  
  );

}

export default UserInfo;
