import React from 'react';
import {ITEM_URL, ITEM_MAP} from '../StaticData';


const ItemInfo=({items, visionWardsBoughtInGame})=>{
  return (
    <div className="ItemInfo">
        <div className="column">
          <div className="grid">
            {items.map((value, idx)=><div className="item" key={idx}>{value===0?'':<img src={ITEM_URL(value)} alt={ITEM_MAP[value].name}></img>}</div>)}
          </div>
          <span>제어와드 {visionWardsBoughtInGame}</span>
        </div>
      </div>    
  );
};

export default ItemInfo;
