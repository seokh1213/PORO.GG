import React, { Component} from 'react';
import {Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {ApolloProvider} from "react-apollo";
import {Query} from "react-apollo";
import {getSummonerInfo} from "./queries.js";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import client from "./apolloClient";
import Nav from './Nav';
import Footer from './Footer';
import './App.css';

export const MyContext=React.createContext({});

const SUPPORTED_SERVERS=['KR','JP1','NA1','EUW1','EUN1','RU','OC1','BR1','TR1','LA1','LA2'];
class App extends Component {
  constructor(props) {
    super(props);
    this.state={favoriteId:{}};
  }
  history=createBrowserHistory();
  setSummonerInfo=(summonerName, region)=>{
    this.history.push(`/summoner/${region}/${summonerName}`);
  }
  
  render() {
    return (
      <ApolloProvider client={client}>
        <MyContext.Provider value={{setSummonerInfo:this.setSummonerInfo}}>
          <Router history={this.history}>
            <div className="App">
              <Nav/>
              <Route exact path="/" render={()=><Home region='KR' summonerName=''/>}/>
              <Route exact path="/summoner/:region/:summonerName" render={({match:{params:{region, summonerName}}})=>
                <Query query={getSummonerInfo(summonerName, region)}>
                  {({loading, data, error})=>{
                    if(loading) {
                      return (
                        <>
                          <Home search={true} region={region} summonerName={summonerName}/>
                          <Detail/>
                        </>
                      );
                    }
                    if(error) {
                      return (
                        <>
                          <Home search={true}/>
                          <Detail error={true}/>
                        </>
                      );
                    }
                    console.log(data);
                    return (
                      <>
                        <Home search={true}/>
                        <Detail data={data.user}/>
                      </>
                    );
                  }}
                </Query>}/>
              <Footer/>
            </div>
          </Router>
        </MyContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
