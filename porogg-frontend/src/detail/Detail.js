import React from "react";
import {Query} from "react-apollo";
import {getSummonerInfo} from "../queries.js";
import DetailInfo from './DetailInfo';
import './Detail.css';

const Detail=(props)=>{
  return (
        <Query query={getSummonerInfo(props.userName)}>
          {({loading, data, error})=>{
            if(loading) return <DetailInfo/>;
            if(error) {console.log(error); return "error";}
            console.log(data);
            return <DetailInfo data={data.user}/>;
          }}
        </Query>
      );
}

export default Detail
