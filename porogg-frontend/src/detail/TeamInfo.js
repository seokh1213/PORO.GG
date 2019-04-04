import React from 'react';
import {Link} from 'react-router-dom';
import {CHAMPION_TILE_URL, CHAMPION_MAP} from '../StaticData';

const TeamInfo=({participants, participantIdentities})=>{
  return (
    <div className="TeamInfo">
      <div className="column">
        {participants.filter(ele=>ele.teamId===100).map((ele, idx)=><div key={idx}><img src={CHAMPION_TILE_URL(Object.entries(CHAMPION_MAP).filter(e=>Number(e[1].key)===ele.championId)[0][1].id)} alt={Object.entries(CHAMPION_MAP).filter(e=>Number(e[1].key)===ele.championId)[0][1].name}></img><Link to={participantIdentities[idx].player.summonerName} replace>{participantIdentities[idx].player.summonerName}</Link></div>)}
      </div>
      <div className="column">
        {participants.filter(ele=>ele.teamId===200).map((ele, idx)=><div key={idx}><img src={CHAMPION_TILE_URL(Object.entries(CHAMPION_MAP).filter(e=>Number(e[1].key)===ele.championId)[0][1].id)} alt={Object.entries(CHAMPION_MAP).filter(e=>Number(e[1].key)===ele.championId)[0][1].name}></img><Link to={participantIdentities[idx+5].player.summonerName} replace>{participantIdentities[idx+5].player.summonerName}</Link></div>)}
      </div>
    </div>    
  );
};

export default TeamInfo;
