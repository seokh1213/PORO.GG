import React from 'react';
import {TIER_IMG,UNRANKED_IMG} from '../StaticData';

const RANK_MAP={'I':1,'II':2,'III':3,'IV':4};

const TierInfo=({league})=>{
  if(league.tier !== undefined) {
    return (
      <div className="TierInfo">    
        <div>{league.text}</div>  
        <img src={TIER_IMG(league.tier.toLowerCase(), RANK_MAP[league.rank])} 
             alt={league.tier.toLowerCase()+league.rank} />
        <div className="tier_rank">{league.tier.toLowerCase()} {RANK_MAP[league.rank]} <span>{league.leaguePoints}LP</span></div>
        <div className="wins_losses">
          {league.wins}승 {league.losses}패 {Math.round((league.wins * 100)/(league.wins+league.losses))}%
        </div>
      </div>    
    );
  }
  else {
    return (
      <div className="TierInfo">    
        <div>{league.text}</div>  
        <img src={UNRANKED_IMG} alt='Unranked' />
        <div className="tier_rank">Unranked</div>
      </div>  
    );
  }

}

export default TierInfo;
