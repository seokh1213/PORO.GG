import React from 'react';
import DetailSummaryTeam from './DetailSummaryTeam';

// league{ queueType RANKED_FLEX_SR, RANKED_SOLO_5x5, tier, rank}
const QUEUE_MAP={420:'RANKED_SOLO_5x5', 440:'RANKED_FLEX_SR'}
const RANK_MAP={'I':1,'II':2,'III':3,'IV':4};
const DetailSummary=({gameInfo, summonerName, users})=>{
  let list=undefined;
  if(users!==undefined) {
    list=users.map(user=>{
      let text=`Level ${user.summonerLevel}`;
      if(QUEUE_MAP[gameInfo.queueId]!==undefined) {
        let leagueInfo=user.league.filter(l=>l.queueType===QUEUE_MAP[gameInfo.queueId])[0];
        text=leagueInfo!==undefined?`${leagueInfo.tier.toLowerCase()} ${RANK_MAP[leagueInfo.rank]}`:text;
      } else {
        let leagueInfo=user.league.filter(l=>l.queueType===QUEUE_MAP[420])[0];
        text=leagueInfo!==undefined?`${leagueInfo.tier.toLowerCase()} ${RANK_MAP[leagueInfo.rank]}`:text;
      }
      return { summonerName:user.summonerName, text:text };
    });
    list=list.map(li=>{
      let participantId=gameInfo.participantIdentities.filter(id=>id.player.summonerName===li.summonerName)[0].participantId;
      return ({...li, participantId});
    })
  }
  let participantId=gameInfo.participantIdentities.filter(ele=>ele.player.summonerName===summonerName)[0].participantId; 
  let participantInfo=gameInfo.participants.filter(ele=>ele.participantId===participantId)[0];
  return (
    <div className="DetailSummary">
      <DetailSummaryTeam leagues={list} win={participantInfo.stats.win} teamId={participantInfo.teamId} gameInfo={gameInfo} summonerName={summonerName}/>
      <DetailSummaryTeam leagues={list} win={!participantInfo.stats.win} teamId={300-participantInfo.teamId} gameInfo={gameInfo} summonerName=""/>
    </div>
  );
};

export default DetailSummary;
