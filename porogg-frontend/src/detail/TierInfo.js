/*
   league: Array(2)
       0:
         leagueName: "Ashe's Tricksters"
         leaguePoints: 49
         losses: 15
         queueType: "RANKED_FLEX_SR"
         rank: "IV"
         tier: "BRONZE"
         wins: 8
         __typename: "League"
         __proto__: Object
       1:
         leagueName: "Poppy's Dragons"
         leaguePoints: 61
         losses: 43
         queueType: "RANKED_SOLO_5x5"
         rank: "I"
         tier: "BRONZE"
         wins: 24
         __typename: "League"
         __proto__: Object
     length: 2
     __proto__: Array(0)
*/

import React from 'react';
import {TIER_IMG,UNRANKED_IMG} from '../StaticData';

const rankMap={'I':1,'II':2,'III':3,'IV':4};

const TierInfo=({league})=>{
  if(league.tier !== undefined) {
    // const TIER_IMG=`https://opgg-static.akamaized.net/images/medals/${league.tier.toLowerCase()}_${rankMap[league.rank]}.png`;
    return (
      <div className="TierInfo">    
        <div>{league.text}</div>  
        <img src={TIER_IMG(league.tier.toLowerCase(), rankMap[league.rank])} 
             alt={league.tier.toLowerCase()+league.rank} />
        <div className="tier_rank">{league.tier.toLowerCase()} {rankMap[league.rank]} <span>{league.leaguePoints}LP</span></div>
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
