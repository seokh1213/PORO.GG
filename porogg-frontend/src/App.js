import React, { Component} from 'react';
import {ApolloProvider} from "react-apollo";
import {Query} from "react-apollo";
import {getSummonerInfo} from "./queries.js";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import client from "./apolloClient";
import Nav from './Nav';
import Footer from './Footer';
import './App.css';

export const MyContext=React.createContext(
  {
    summonerName:"",
    setSummonerName:()=>{},
  }
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state={summonerName:"", error:false, setSummonerName:this.setSummonerName};
  }
  setSummonerName=(summonerName)=>{
    this.setState({summonerName:summonerName});
  }
  setError=error=>{
    this.setState({error:error});
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <MyContext.Provider value={this.state}>
          <div className="App">
            <Nav/>
            { 
              this.state.summonerName === ""?
              <Home/>
              :
              <Query query={getSummonerInfo(this.state.summonerName)}>
                {({loading, data, error})=>{
                  if(loading) {
                    return (
                      <>
                        <Home/>
                        <Detail/>
                      </>
                    );
                  }
                  if(error) {
                    return (
                      <>
                        <Home error={true}/>
                        <Detail error={true}/>
                      </>
                    );
                  }
                  console.log(data);
                  return (
                      <>
                        <Home/>
                        <Detail data={data.user}/>
                      </>
                    );
                }}
              </Query>
              }
            <Footer/>
          </div>
        </MyContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
