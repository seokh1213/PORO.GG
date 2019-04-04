import React from 'react';
import {Link} from 'react-router-dom';
import {CHAMPION_MAP, SPELL_MAP, RUNE_MAP, CHAMPION_TILE_URL, RUNE_URL, SPELL_URL, ITEM_URL, ITEM_MAP} from '../StaticData';

const DetailSummaryTeam=({win, teamId, gameInfo, leagues})=>{
  const getChampId=championId=>Object.entries(CHAMPION_MAP).filter(ele=>Number(ele[1].key)===championId)[0][1].id;
  const getSpellInfo=spellId=>Object.entries(SPELL_MAP).filter(ele=>Number(ele[1].key)===spellId)[0];
  const getRuneInfo=runeId=>RUNE_MAP.filter(ele=>ele.id===runeId)[0];
  const totalKills={100:gameInfo.participants.filter(ele=>ele.teamId===100).reduce((a, v)=>a+v.stats.kills, 0),200:gameInfo.participants.filter(ele=>ele.teamId===200).reduce((a, v)=>a+v.stats.kills, 0)};
  const maxDamage=gameInfo.participants.filter(ele=>ele.teamId===teamId).reduce((a, v)=>(Number(v.stats.totalDamageDealtToChampions))>a?v.stats.totalDamageDealtToChampions:a, 0);
  return (
    <table className={win?"DetailSummaryTeam win":"DetailSummaryTeam loose"}>
      <colgroup>
        <col className="ChampionImage"/>
        <col className="SummonerSpell"/>
        <col className="KeystoneMastery"/>
        <col className="SummonerName"/>
        {leagues!==undefined?<col className="Tier"/>:''}
        <col className="OPScore"/>
        <col className="KDA"/>
        <col className="Damage"/>
        <col className="Ward"/>
        <col className="CS"/>
        <col className="Items"/>
      </colgroup>
        <thead>
          <tr>
            <th colSpan="4"><span className={win?'winText':'looseText'}>{win?'승리':'패배'}</span> ({teamId===200?'레드':'블루'}팀)</th>
            {leagues!==undefined?<th>티어</th>:''}
            <th>KDA</th>
            <th>피해량</th>
            <th>와드</th>
            <th>cs</th>
            <th>아이템</th>
          </tr>
        </thead>
        <tbody>
          {
            gameInfo.participants.filter(ele=>ele.teamId===teamId).map((participant, index)=>
            (
              <tr key={participant.participantId}>
                <td className="ChampionImage Cell"><img src={CHAMPION_TILE_URL(getChampId(participant.championId))} alt={getChampId(participant.championId)}></img><div>{participant.stats.champLevel}</div></td>
                <td className="Spell Cell">
                  <img src={SPELL_URL(getSpellInfo(participant.spell1Id)[0])} alt={getSpellInfo(participant.spell1Id)[1].name}>
                  </img><img src={SPELL_URL(getSpellInfo(participant.spell2Id)[0])} alt={getSpellInfo(participant.spell2Id)[1].name}></img>
                </td>
                <td className="Rune Cell">
                  <img src={RUNE_URL(getRuneInfo(participant.stats.perkPrimaryStyle).slots[0].runes.filter(ele=>ele.id===participant.stats.perk0)[0].icon)} alt={getRuneInfo(participant.stats.perkPrimaryStyle).name}></img>
                  <img src={RUNE_URL(getRuneInfo(participant.stats.perkSubStyle).icon)} alt={getRuneInfo(participant.stats.perkSubStyle).name}></img>
                </td>
                <td className="SummonerName Cell">
                  <Link to={gameInfo.participantIdentities.filter(id=>id.participantId===participant.participantId)[0].player.summonerName} replace>{gameInfo.participantIdentities.filter(id=>id.participantId===participant.participantId)[0].player.summonerName}</Link>
                </td>
                {leagues!==undefined?<td className="Tier Cell">{leagues.filter(league=>league.participantId===participant.participantId)[0].text}</td>:''}
                <td className="KDA Cell"><div>{((participant.stats.kills+participant.stats.assists)/participant.stats.deaths).toFixed(2)}:1</div><div>{`${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists} (${Math.round((participant.stats.kills+participant.stats.assists)/(totalKills[participant.teamId])*100)}%)`}</div></td>
                <td className="Damage Cell"><div>{participant.stats.totalDamageDealtToChampions.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div><div className="MaxDamage"><div style={{width:`${participant.stats.totalDamageDealtToChampions/maxDamage*100}%`}}></div></div></td>
                <td className="Ward Cell"><div>{participant.stats.visionWardsBoughtInGame}</div><div>{participant.stats.wardsKilled}/{participant.stats.wardsPlaced}</div></td>
                <td className="CS Cell"><div>{participant.stats.totalMinionsKilled}</div><div>분당 {(participant.stats.totalMinionsKilled/gameInfo.gameDuration*60).toFixed(1)}</div></td>
                <td className="Items Cell">
                  {[participant.stats.item0, participant.stats.item1, participant.stats.item2, participant.stats.item3, participant.stats.item4, participant.stats.item5, participant.stats.item6].map((value, idx)=><div key={idx}>{value===0?'':<img src={ITEM_URL(value)} alt={ITEM_MAP[value].name}></img>}</div>)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>  
  );
};

export default DetailSummaryTeam;
