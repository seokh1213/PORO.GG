import React from 'react';
import {CHAMPION_MAP, ITEM_MAP, SPELL_MAP, RUNE_MAP, CHAMPION_TILE_URL, RUNE_URL, SPELL_URL, ITEM_URL} from '../StaticData';
const seasonsMap=['PRESEASON 3', 'SEASON 3','PRESEASON 2014', 'SEASON 2014','PRESEASON 2015', 'SEASON 2015','PRESEASON 2016', 'SEASON 2016', 'PRESEASON 2017', 'SEASON 2017','PRESEASON 2018', 'SEASON 2018','PRESEASON 2019', 'SEASON 2019'];
const queueMap={0:'커스텀', 420:'솔랭',430:'일반', 440:'자유 5:5 랭크', 450:'무작위 총력전', 900:'URF'};
const killMap={2:'더블킬',3:'트리플킬',4:'쿼드라킬',5:'펜타킬'};

const Match=({gameInfo, summonerName})=> {
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
  let kills=gameInfo.participants.filter(ele=>ele.teamId===participantInfo.teamId).reduce((a, v)=>a+v.stats.kills, 0);
  return (
    <div className={participantInfo.stats.win?"Match win":"Match loose"}>
      <div className="metaInfo">
        <span className="modeText">{queueMap[gameInfo.queueId]}</span> 
        <span>{diffHours>=24?`${Math.round(diffHours/24)}일전`:`${diffHours}시간전`}</span>
        <hr/>
        <span className={participantInfo.stats.win?"winText":"looseText"}>{participantInfo.stats.win?'승리':'패배'}</span> 
        <span>{`${minutes}분${seconds}초`}</span> 
      </div>
      <div className="championInfo">
        <div className="column">
          <div className="grid">
            <img className="championImg" src={CHAMPION_TILE_URL(championInfo.id)} alt={championInfo.name}></img>
            <img className="spell1Img" src={SPELL_URL(spell1Info[0])} alt={spell1Info[1].name}></img>
            <img className="spell2Img"src={SPELL_URL(spell2Info[0])} alt={spell2Info[1].name}></img>
            <img className="primaryRune" src={RUNE_URL(primaryRuneInfo.icon)} alt={primaryRuneInfo.name}></img>
            <img className="subRune"src={RUNE_URL(subRuneInfo.icon)} alt={subRuneInfo.name}></img>
          </div>
          <span className="championName">{championInfo.name}</span>
        </div>
        <div className="column">
          <div className="kda">{participantInfo.stats.kills} / <span className="deaths">{participantInfo.stats.deaths}</span> / {participantInfo.stats.assists}</div>
          <div className="kdaRatio"><span>{((participantInfo.stats.kills+participantInfo.stats.assists)/participantInfo.stats.deaths).toFixed(2)}:1</span> 평점</div>
          {participantInfo.stats.largestMultiKill>1?<span className="largestKill">{killMap[participantInfo.stats.largestMultiKill]}</span>:''}
        </div>
        <div className="column">
          <div>레벨{participantInfo.stats.champLevel}</div>
          <div>{participantInfo.stats.totalMinionsKilled} ({(participantInfo.stats.totalMinionsKilled/gameInfo.gameDuration*60).toFixed(1)}) CS</div> 
          <div className="killRatio">킬관여 {Math.round((participantInfo.stats.kills+participantInfo.stats.assists)/(kills)*100)}%</div>
        </div>
      </div>
      <div className="itemInfo">
        <div className="column">
          <div className="grid">
            <div className="item">{participantInfo.stats.item0===0?'':<img src={ITEM_URL(participantInfo.stats.item0)}></img>}</div>
            <div className="item">{participantInfo.stats.item1===0?'':<img src={ITEM_URL(participantInfo.stats.item1)}></img>}</div>
            <div className="item">{participantInfo.stats.item2===0?'':<img src={ITEM_URL(participantInfo.stats.item2)}></img>}</div>
            <div className="item">{participantInfo.stats.item6===0?'':<img src={ITEM_URL(participantInfo.stats.item6)}></img>}</div>
            <div className="item">{participantInfo.stats.item3===0?'':<img src={ITEM_URL(participantInfo.stats.item3)}></img>}</div>
            <div className="item">{participantInfo.stats.item4===0?'':<img src={ITEM_URL(participantInfo.stats.item4)}></img>}</div>
            <div className="item">{participantInfo.stats.item5===0?'':<img src={ITEM_URL(participantInfo.stats.item5)}></img>}</div>
          </div>
          <span>{participantInfo.stats.visionWardsBoughtInGame}/{participantInfo.stats.wardsPlaced}/{participantInfo.stats.wardsKilled}</span>
        </div>
      </div>
      <div className="teamInfo">
        <div className="column">
          {gameInfo.participants.filter(ele=>ele.teamId===100).map((ele, idx)=><div key={idx}><img src={CHAMPION_TILE_URL(Object.entries(CHAMPION_MAP).filter(e=>Number(e[1].key)===ele.championId)[0][1].id)}></img><span> {gameInfo.participantIdentities[idx].player.summonerName}</span></div>)}
        </div>
        <div className="column">
          {gameInfo.participants.filter(ele=>ele.teamId===200).map((ele, idx)=><div key={idx}><img src={CHAMPION_TILE_URL(Object.entries(CHAMPION_MAP).filter(e=>Number(e[1].key)===ele.championId)[0][1].id)}></img><span> {gameInfo.participantIdentities[idx+5].player.summonerName}</span></div>)}
        </div>
      </div>
    </div> 
  );
};

export default Match;
