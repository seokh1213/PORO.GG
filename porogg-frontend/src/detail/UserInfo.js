import React from 'react';
import unfavorite from '../static/images/unfavorite.svg';
import favorite from '../static/images/favorite.svg';

const profileIconURL="http://ddragon.leagueoflegends.com/cdn/9.6.1/img/profileicon/";

const UserInfo=({data, isFavorite})=>{
    return (
      <div className="profile">
        <img src={profileIconURL+data.profileIconId+".png"} alt="Profile Icon" title={data.profileIconId} className="profileIcon"></img>
        <div className="info">
          <div className="name">{data.summonerName}</div>
          <div className="level">{data.summonerLevel} levels</div>
        </div>
        <div className="favorite">
          <span>
            <img className="starSVG" src={isFavorite?favorite:unfavorite} alt="Star svg" />
            Favorites
          </span>
        </div>
      </div>  
    );

}

export default UserInfo;
