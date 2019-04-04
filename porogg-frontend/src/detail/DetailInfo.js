import React, {useState} from 'react';
import DetailNav from './DetailNav';
import DetailSummary from './DetailSummary';
import DetailBuild from './DetailBuild';
import DetailStats from './DetailStats';

const DetailInfo=({gameInfo, summonerName, users})=>{
  const [selectedTab, setSelectedTab]=useState(1);
  let participantId=gameInfo.participantIdentities.filter(ele=>ele.player.summonerName===summonerName)[0].participantId; 
  let participantInfo=gameInfo.participants.filter(ele=>ele.participantId===participantId)[0];
  return (
    <div className="DetailInfo">
      <DetailNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} win={participantInfo.stats.win}/>
      {
        selectedTab===1?
          <DetailSummary {...{gameInfo, summonerName, users}}/>:
        selectedTab===2?
          <DetailBuild {...{gameInfo, summonerName}}/>:
          <DetailStats {...{gameInfo, summonerName}}/>
      }
    </div>
  );
};

export default DetailInfo;
