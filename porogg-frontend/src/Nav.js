import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
          <span className="logo"><Link to="/" replace>PORO.GG</Link></span>
      </div>
    );
  }
}

export default Nav;
