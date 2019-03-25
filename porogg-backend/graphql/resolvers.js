import fetch from "node-fetch";
import API_KEY from './apikey';

const getSummonerInfo=async (summonerName, region)=> {
  const BASE_URL=`https://${region.toLowerCase()}.api.riotgames.com`;
  let userInfo=await fetch(BASE_URL+`/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`).then(res=>res.json());
  let userLeagueInfo=await fetch(BASE_URL+`/lol/league/v4/positions/by-summoner/${userInfo.id}?api_key=${API_KEY}`).then(res=>res.json());
  return {
    summonerLevel:userInfo.summonerLevel,
    summonerName:userInfo.name,
    summonerId:userInfo.id,
    profileIconId:userInfo.profileIconId,
    league:userLeagueInfo
  };
}
const resolvers ={
  Query:{
    user: (_, {userName, region})=>{return getSummonerInfo(encodeURI(userName), region)}
  }

}

export default resolvers;
