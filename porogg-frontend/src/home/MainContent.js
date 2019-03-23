import React, {Component} from 'react';
import MainImage from './MainImage';
const ERROR_IMAGE_URL="https://www.pngkey.com/png/full/43-431793_shock-emoji-png.png";
const NORMAL_IMAGE_URL="https://www.pngkey.com/png/full/280-2801795_cartoon-tongue-png.png";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state={inputValue:"", imageURL:NORMAL_IMAGE_URL};
  }
  checkEvent=(eve)=>{
    if(this.state.inputValue!=="" && (eve.keyCode === 13 || (eve.type==='click' && eve.target.type==='button'))) {
      this.props.getInput(this.state.inputValue);
    }
    eve.preventDefault();
  }
  handleChange=(e)=>{
    this.setState({inputValue:e.target.value});
  }
  render(){
    return (
      <div className="MainContent">
        <MainImage imagePath={this.state.imageURL} alt={"Main Image"} title={"Main Image"}/>
        <div action="/summoner/" method="get" id="inputForm" onClick={this.checkEvent} onKeyUp={this.checkEvent}>
          <input name="userName" type="text" onChange={this.handleChange} className="idInput" placeholder="소환사 명, 소환사명, ..." autoComplete="off"/>
          <button type="button" className="inputButton">.GG</button>
        </div>
      </div>
    );
  }
  
}

export default MainContent;
