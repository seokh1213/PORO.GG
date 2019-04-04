import React, {useState} from "react";
import UserInfo from './UserInfo';
import TierInfo from './TierInfo';
import Match from './Match';
import {ERROR_IMAGE_URL} from '../StaticData';
import './Detail.css';

const Detail=({data, error, region, title})=> { 
  const [matchesInfo, setMatchesInfo]=useState({matches:3, isDetailCnt:0});
  const onDetail=isDetail=>setMatchesInfo({...matchesInfo, isDetailCnt:matchesInfo.isDetailCnt+(isDetail?1:-1)});
  // style={{minHeight:`${221+107*matchesInfo.matches+matchesInfo.isDetailCnt*553}px`}}
  if(error)
    return (
        <div className="Detail">
          <img id="mainImage" src={ERROR_IMAGE_URL} alt="Error Poro" />
          <span>등록되지 않은 소환사 입니다. 오타를 확인 후 다시 검색해주세요.</span>
        </div>
    );
  else
    if(data !== undefined) {
      let soloLeague={text:'솔로랭크'}, flexLeague={text:'자유랭크'};
      data.user.league.forEach(value=>{
        if(value.queueType === 'RANKED_SOLO_5x5') {
          soloLeague=value;
          soloLeague.text="솔로랭크";
        }
        else if(value.queueType === 'RANKED_FLEX_SR') {
          flexLeague=value;
          flexLeague.text="자유랭크";
        }
      });
      return (
         <div className="Detail">
           <UserInfo data={data.user} region={region}/>
           <div className="TierInfos">
             <TierInfo league={soloLeague}/>
             <TierInfo league={flexLeague}/>
           </div>
           <div className="Matches">
             {
              data.matches.gameInfos.map(gameInfo=><Match onDetail={onDetail} region={region} gameInfo={gameInfo} summonerName={data.user.summonerName} key={gameInfo.gameId}/>)
             }
           </div>
         </div> 
      );
    } else {
      return (
        <div className="Detail">
          <svg alt='loading' xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 50 50'>
              <path fill='#8e532b' d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'>
                <animateTransform attributeType='xml' attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='0.6s' repeatCount='indefinite' />
              </path>
          </svg>
        </div> 
      );
    }
};
export default Detail;
