import React from 'react';
import UserInfo from './UserInfo';

const DetailInfo=({data})=> {
  return (
     <div className="DetailInfo">
       <UserInfo 
          data={data}/>
     </div> 
  );
};

export default DetailInfo;
