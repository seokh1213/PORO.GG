import React from 'react';

const DetailButton=({win})=>{
  return (
      <div className={win?"detailButton win":"detailButton loose"}>
        <span className="unfold">+</span>
        <span className="fold">-</span>
      </div>
  );
};

export default DetailButton;
