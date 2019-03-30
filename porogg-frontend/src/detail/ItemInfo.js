import React from 'react';
import {ITEM_URL, ITEM_MAP} from '../StaticData';


const ItemInfo=({items, visionWardsBoughtInGame})=>{
  return (
    <div className="itemInfo">
        <div className="column">
          <div className="grid">
            <div className="item">{items[0]===0?'':<img src={ITEM_URL(items[0])} alt={ITEM_MAP[items[0]].name}></img>}</div>
            <div className="item">{items[1]===0?'':<img src={ITEM_URL(items[1])} alt={ITEM_MAP[items[1]].name}></img>}</div>
            <div className="item">{items[2]===0?'':<img src={ITEM_URL(items[2])} alt={ITEM_MAP[items[2]].name}></img>}</div>
            <div className="item">{items[6]===0?'':<img src={ITEM_URL(items[6])} alt={ITEM_MAP[items[6]].name}></img>}</div>
            <div className="item">{items[3]===0?'':<img src={ITEM_URL(items[3])} alt={ITEM_MAP[items[3]].name}></img>}</div>
            <div className="item">{items[4]===0?'':<img src={ITEM_URL(items[4])} alt={ITEM_MAP[items[4]].name}></img>}</div>
            <div className="item">{items[5]===0?'':<img src={ITEM_URL(items[5])} alt={ITEM_MAP[items[5]].name}></img>}</div>
          </div>
          <span>제어와드 {visionWardsBoughtInGame}</span>
        </div>
      </div>    
  );
};

export default ItemInfo;
