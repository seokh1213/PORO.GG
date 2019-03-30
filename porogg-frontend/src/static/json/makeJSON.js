/*
 * Make static data to json file.
 * node install --global fs node-fetch
 * node makeJSON.js
 *
 * championFull.json 챔피언 스탯,스킨 등 자세한 정보  
 * language.json 용어 번역
 * mission-assets.json ?? 
 * runesReforged.json 룬 번호  
 * summoner.json 스펠
 * champion.json 챔피언 간단한 정보 
 * item.json 아이템 정보         
 * map.json 맵 정보      
 * profileicon.json 아이콘 정보     
 * sticker.json 스티커 정보 뭐없음
 */
let fetch=require('node-fetch');
let fs=require('fs');

const VERSION='9.6.1';
const fetchJSON=async (pointName)=>{
  console.log(`${pointName} fetch start`);
  const json=await fetch(`http://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/${pointName}.json`).then(res=>res.json()).then(data=>JSON.stringify(data)); 
  console.log('fetch complete. write file start');
  fs.writeFileSync(`${pointName}.json`, json, 'utf8');
  console.log(`${pointName}.json write complete`);
}
console.log('----------------------------------------');
fetchJSON('champion');
fetchJSON('map');
fetchJSON('item');
fetchJSON('summoner');
fetchJSON('runesReforged');
console.log('----------------------------------------');
