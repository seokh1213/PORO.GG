import React, { Component} from 'react';
import {Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {ApolloProvider, Query} from "react-apollo";
import {getSummonerInfo} from "./queries.js";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import client from "./apolloClient";
import Nav from './Nav';
import Footer from './Footer';
import preprocessingString from './preprocessingString';
import './App.css';
import {dataJSON} from './StaticData'; //DEBUG

export const MyContext=React.createContext({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state={favoriteId:{}};
    this.favoriteList={};
    const rawList=sessionStorage.getItem('SummonerList');
    if(rawList!==null && rawList!=='') {
      this.favoriteList=JSON.parse(rawList);
    }
  }
  history=createBrowserHistory();
  setSummonerInfo=(summonerName, region)=>{
    this.history.push(`/summoner/${region}/${summonerName}`);
  }
  toggleFavoriteSummoner=(summonerName, region)=>{
    if(this.favoriteList[summonerName]===undefined) {
      this.favoriteList[summonerName]=region;
    } else {
      delete this.favoriteList[summonerName];
    }
    sessionStorage.setItem('SummonerList', JSON.stringify(this.favoriteList));
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <MyContext.Provider value={{setSummonerInfo:this.setSummonerInfo, toggleFavoriteSummoner:this.toggleFavoriteSummoner, favoriteList:this.favoriteList}}>
          <Router history={this.history}>
            <div className="App">
              <Nav/>
              <Route exact path="/" render={()=>{document.title='PORO.GG'; return <Home region='KR' summonerName=''/>}}/>
              <Route exact path="/summoner/:region/:summonerName" render={({match:{params:{region, summonerName}}})=>{
                summonerName=preprocessingString(summonerName);
                document.title=`${summonerName} - 전적검색 League of legends`;
                return (
                <Query query={getSummonerInfo(summonerName, region)}>
                  {({loading, data, error})=>{
                    if(loading) {
                      return (
                        <>
                          <Home search={true} region={region} summonerName={summonerName}/>
                          <Detail region={region}/>
                        </>
                      );
                    }
                    if(error) {
                      return (
                        <>
                          <Home search={true} region={region} summonerName={summonerName}/>
                          <Detail region={region} error={true}/>
                        </>
                      );
                    }
                    console.log(data);
                    return (
                      <>
                        <Home search={true} region={region} summonerName={summonerName}/>
                        <Detail region={region} data={data}/>
                      </>
                    );
                  }}
                </Query>);
                }}/>
              <Footer/>
            </div>
          </Router>
        </MyContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
