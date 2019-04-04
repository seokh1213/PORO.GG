import React, {useState} from 'react';

const DetailNav=({win, selectedTab, setSelectedTab})=>{
  return (
    <div className={win?"DetailNav win":"DetailNav loose"}>
      <div onClick={()=>{setSelectedTab(1);}} className={selectedTab!==1?'unselected':''}>종합</div>
      <div onClick={()=>{setSelectedTab(2);}} className={selectedTab!==2?'unselected':''}>빌드</div>
      <div onClick={()=>{setSelectedTab(3);}} className={selectedTab!==3?'unselected':''}>분석</div>
    </div>
  );
};

export default DetailNav;
