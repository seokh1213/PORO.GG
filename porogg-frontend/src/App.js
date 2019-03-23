import React, { Component } from 'react';
import {ApolloProvider} from "react-apollo";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import client from "./apolloClient";
import Nav from './Nav';
import Footer from './Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={summonerName:""};
  }
  getInput=(summonerName)=>{
    this.setState({summonerName:summonerName});
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Nav/>
          <Home getInput={this.getInput}/>
          { this.state.summonerName !== "" &&<Detail userName={this.state.summonerName}/> }
          <Footer/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
