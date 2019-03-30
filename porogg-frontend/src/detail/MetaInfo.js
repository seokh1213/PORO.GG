import React from 'react';

const MetaInfo=({queueText, diffHours, win, minutes, seconds})=>{
  return (
    <div className="metaInfo">
      <span className="modeText">{queueText}</span> 
      <span>{diffHours>=24?`${Math.round(diffHours/24)}일전`:`${diffHours}시간전`}</span>
      <hr/>
      <span className={win?"winText":"looseText"}>{win?'승리':'패배'}</span> 
      <span>{`${minutes}분${seconds}초`}</span> 
    </div>
  );
};

export default MetaInfo;
