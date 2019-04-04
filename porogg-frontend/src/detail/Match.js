import React, {useState} from 'react';
import {ApolloProvider, Query} from "react-apollo";
import {getSummonersLeagueInfo} from "../queries.js";
import {CHAMPION_MAP, SPELL_MAP, RUNE_MAP, CHAMPION_TILE_URL, RUNE_URL, SPELL_URL} from '../StaticData';
import MetaInfo from './MetaInfo';
import ChampionInfo from './ChampionInfo';
import ItemInfo from './ItemInfo';
import TeamInfo from './TeamInfo';
import DetailInfo from './DetailInfo';

const seasonsMap=['PRESEASON 3', 'SEASON 3','PRESEASON 2014', 'SEASON 2014','PRESEASON 2015', 'SEASON 2015','PRESEASON 2016', 'SEASON 2016', 'PRESEASON 2017', 'SEASON 2017','PRESEASON 2018', 'SEASON 2018','PRESEASON 2019', 'SEASON 2019'];
const queueMap={0:'커스텀', 420:'솔랭',430:'일반', 440:'자유 5:5 랭크', 450:'무작위 총력전', 900:'URF'};
const killMap={2:'더블킬',3:'트리플킬',4:'쿼드라킬',5:'펜타킬'};

const Match=({gameInfo, summonerName, region, onDetail})=> {
  let diffHours=Math.round(((new Date()).getTime()-Number(gameInfo.gameCreation))/(1000*60*60));
  let minutes=parseInt(gameInfo.gameDuration/60);
  let seconds=gameInfo.gameDuration%60;
  let participantId=gameInfo.participantIdentities.filter(ele=>ele.player.summonerName===summonerName)[0].participantId; 
  let participantInfo=gameInfo.participants.filter(ele=>ele.participantId===participantId)[0];
  let championInfo=Object.entries(CHAMPION_MAP).filter(ele=>Number(ele[1].key)===participantInfo.championId)[0][1];
  let primaryRuneInfo=RUNE_MAP.filter(ele=>ele.id===participantInfo.stats.perkPrimaryStyle)[0];
  let subRuneInfo=RUNE_MAP.filter(ele=>ele.id===participantInfo.stats.perkSubStyle)[0];
  let spell1Info=Object.entries(SPELL_MAP).filter(ele=>Number(ele[1].key)===participantInfo.spell1Id)[0];
  let spell2Info=Object.entries(SPELL_MAP).filter(ele=>Number(ele[1].key)===participantInfo.spell2Id)[0];
  let totalKills=gameInfo.participants.filter(ele=>ele.teamId===participantInfo.teamId).reduce((a, v)=>a+v.stats.kills, 0);
  let summonerIds=gameInfo.participantIdentities.map(v=>v.player.summonerId);
  const [isDetail, toggleDetail]=useState(false);
  const detailOnClick=()=>{
    toggleDetail(!isDetail);
    onDetail(!isDetail);
  };
  return (
    <>
    <div className={participantInfo.stats.win?"Match win":"Match loose"} style={isDetail?{marginBottom:"0", borderBottom:"0"}:{}}>
      <MetaInfo 
          queueText={queueMap[gameInfo.queueId]} 
          diffHours={diffHours}
          win={participantInfo.stats.win}
          minutes={minutes}
          seconds={seconds}/>
      <ChampionInfo 
          championImg={CHAMPION_TILE_URL(championInfo.id)}
          championName={championInfo.name}
          spell1Img={SPELL_URL(spell1Info[0])}
          spell1Name={spell1Info[1].name}
          spell2Img={SPELL_URL(spell2Info[0])}
          spell2Name={spell2Info[1].name}
          primaryRuneImg={RUNE_URL(primaryRuneInfo.slots[0].runes.filter(ele=>ele.id===participantInfo.stats.perk0)[0].icon)}
          primaryRuneName={primaryRuneInfo.name}
          subRuneImg={RUNE_URL(subRuneInfo.icon)}
          subRuneName={subRuneInfo.name}
          kills={participantInfo.stats.kills}
          deaths={participantInfo.stats.deaths}
          assists={participantInfo.stats.assists}
          kdaRatio={((participantInfo.stats.kills+participantInfo.stats.assists)/participantInfo.stats.deaths).toFixed(2)}
          largestMultiKill={participantInfo.stats.largestMultiKill}
          largestMultiKillText={killMap[participantInfo.stats.largestMultiKill]}
          champLevel={participantInfo.stats.champLevel}
          totalMinionsKilled={participantInfo.stats.totalMinionsKilled}
          minionsPerMinute={(participantInfo.stats.totalMinionsKilled/gameInfo.gameDuration*60).toFixed(1)}
          totalKillRatio={Math.round((participantInfo.stats.kills+participantInfo.stats.assists)/(totalKills)*100)}/>
      <ItemInfo
        items={[participantInfo.stats.item0, participantInfo.stats.item1, participantInfo.stats.item2, participantInfo.stats.item3, participantInfo.stats.item4, participantInfo.stats.item5, participantInfo.stats.item6]}
        visionWardsBoughtInGame={participantInfo.stats.visionWardsBoughtInGame}/>
      <TeamInfo
        participants={gameInfo.participants}
        participantIdentities={gameInfo.participantIdentities}/>
      <div onClick={detailOnClick} className={participantInfo.stats.win?"DetailButton win":"DetailButton loose"} style={isDetail?{borderBottom:"0"}:{}}>
        {isDetail?
          <span className="fold">-</span>:
          <span className="unfold">+</span>}
      </div>
    </div> 
    {isDetail?
      <Query query={getSummonersLeagueInfo(summonerIds, region)}>
        {({loading, data, error})=>{
          if(loading) {
            return (
              <svg alt='loading' xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 50 50'>
                <path fill={participantInfo.stats.win?'#4aa1d2':'#e89d99'} d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'>
                  <animateTransform attributeType='xml' attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='0.6s' repeatCount='indefinite' />
                </path>
              </svg>
            );
          }
          if(error) {
            return (
              <DetailInfo {...{gameInfo, summonerName}}/>
            );
          }
          return (
            <DetailInfo {...{gameInfo, summonerName, users:data.users}}/>
          );
        }}
      </Query>
      :
      ''}
    </>
  );
};

export default Match;
