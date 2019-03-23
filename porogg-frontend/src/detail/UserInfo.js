import React from 'react';

const profileIconURL="http://ddragon.leagueoflegends.com/cdn/9.6.1/img/profileicon/";

const UserInfo=({data})=>{
  if(data === undefined) {
    return (
      <div className="profile">
        <div className="profileIcon"></div>
        <div className=""></div>
        <div></div>
      </div>
    );
  } else {
      return (
        <div className="profile">
          <img src={profileIconURL+data.profileIconId+".png"} alt="Profile Icon" title={data.profileIconId} className="profileIcon"></img>
          <div className="name">{data.summonerName}</div>
          <div className="level">{data.summonerLevel} levels</div>
        </div>  
      );
  }

}

export default UserInfo;
