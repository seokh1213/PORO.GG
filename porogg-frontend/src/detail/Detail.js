import React from "react";
import UserInfo from './UserInfo';
import './Detail.css';

const Detail=({data, error})=> {
  if(error)
    return (
       <div className="DetailInfo">
        등록되지 않은 소환사 입니다. 오타를 확인 후 다시 검색해주세요.
       </div> 
    );
  else
    return (
       <div className="DetailInfo">
         <UserInfo 
            data={data}/>
       </div> 
    );
};
export default Detail
