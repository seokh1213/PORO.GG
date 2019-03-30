import fetch from "node-fetch";
import API_KEY from './apikey';

const BASE_URL=region=>`https://${region.toLowerCase()}.api.riotgames.com`;

const resolvers ={
  Query:{
    user: (_, {userName, region})=>{return getSummonerInfo(encodeURI(userName), region)},
    matches: (_, {accountId, userName,region, beginIndex, endIndex, champion, queue})=>{return getLeagueInfo(accountId, encodeURI(userName), region, beginIndex, endIndex, champion, queue)},
    championMastery:(_, {summonerId, championId, region})=>{return getChampionMastery(summonerId, championId, region)},
  }
};
const delay=(ms)=>{
  let ts1 = new Date().getTime() + ms, ts2;
  do ts2 = new Date().getTime(); while (ts2<ts1);
};
const getSummonerInfo=async (summonerName, region)=> {
  let userInfo=await fetch(BASE_URL(region)+`/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`).then(res=>res.json());
  let userLeagueInfo=await fetch(BASE_URL(region)+`/lol/league/v4/positions/by-summoner/${userInfo.id}?api_key=${API_KEY}`).then(res=>res.json());
  return {
    accountId:userInfo.accountId,
    summonerLevel:userInfo.summonerLevel,
    summonerId:userInfo.id,
    summonerName:userInfo.name,
    profileIconId:userInfo.profileIconId,
    league:userLeagueInfo,
  };
};
const getLeagueInfo=async (accountId, summonerName, region, beginIndex, endIndex, champion, queue)=> {
  if(accountId===undefined && summonerName==='undefined') {
    return null;
  } else if(accountId===undefined && summonerName!=='undefined') {
    let userInfo=await fetch(BASE_URL(region)+`/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`).then(res=>res.json());
    accountId=userInfo.accountId;
  }
  beginIndex=beginIndex===undefined?0:beginIndex;
  endIndex=endIndex===undefined?20:endIndex;
  [beginIndex, endIndex]=beginIndex>endIndex?[endIndex,beginIndex]:[beginIndex,endIndex];
  let matches=await fetch(BASE_URL(region)+`/lol/match/v4/matchlists/by-account/${accountId}?api_key=${API_KEY}&endIndex=${endIndex}&beginIndex=${beginIndex}${champion!==undefined?`&champion=${champion}`:''}${queue!==undefined?`&queue=${queue}`:''}`).then(res=>res.json());
  let gameInfos=await Promise.all(matches.matches.map(match=>{delay(70); return getGameInfo(match.gameId, region)}));
  matches.matches.map((match, index)=>{
    gameInfos[index].lane=match.lane;
    gameInfos[index].champion=match.champion;
    gameInfos[index].platformId=match.platformId;
    gameInfos[index].timestamp=match.timestamp;
    gameInfos[index].role=match.role;
    gameInfos[index].season=match.season;
  });
  return {
    totalGames:matches.totalGames,
    gameInfos:gameInfos
  };
};
const getGameInfo=async (matchId, region)=>{
  let match=await fetch(BASE_URL(region)+`/lol/match/v4/matches/${matchId}?api_key=${API_KEY}`).then(res=>res.json());
  return match;
};
const getChampionMastery=async (summonerId, championId, region)=> {
  let masteryInfo=await fetch(BASE_URL(region)+`/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${API_KEY}`).then(res=>res.json());
  return masteryInfo;
};

export default resolvers;
