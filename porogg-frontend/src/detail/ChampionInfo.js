import React from 'react';

const ChampionInfo=({championImg, championName, spell1Img, spell2Img, spell1Name, spell2Name, primaryRuneImg, subRuneImg, primaryRuneName, subRuneName, kills, deaths, assists, largestMultiKill, largestMultiKillText, champLevel, totalMinionsKilled, minionsPerMinute, kdaRatio, totalKillRatio})=>{
  return (
    <div className="ChampionInfo">
        <div className="column">
          <div className="grid">
            <img className="championImg" src={championImg} alt={championName}></img>
            <img className="spell1Img" src={spell1Img} alt={spell1Name}></img>
            <img className="spell2Img"src={spell2Img} alt={spell2Name}></img>
            <img className="primaryRune" src={primaryRuneImg} alt={primaryRuneName}></img>
            <img className="subRune"src={subRuneImg} alt={subRuneName}></img>
          </div>
          <span className="championName">{championName}</span>
        </div>
        <div className="column">
          <div className="kda">{kills} / <span className="deaths">{deaths}</span> / {assists}</div>
          <div className="kdaRatio"><span>{kdaRatio}:1</span> 평점</div>
          {largestMultiKill>1?<span className="largestKill">{largestMultiKillText}</span>:''}
        </div>
        <div className="column">
          <div>레벨{champLevel}</div>
          <div>{totalMinionsKilled} ({minionsPerMinute}) CS</div> 
          <div className="killRatio">킬관여 {totalKillRatio}%</div>
        </div>
      </div>  
  );
};

export default ChampionInfo;
