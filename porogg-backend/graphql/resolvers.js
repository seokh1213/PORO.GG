import fetch from "node-fetch";
import API_KEY from './apikey';

const BASE_URL="https://kr.api.riotgames.com";
const getSummonerInfo=async (summonerName)=> {
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
    user: (_, {userName})=>{return getSummonerInfo(encodeURI(userName))}
  }

}

export default resolvers;
