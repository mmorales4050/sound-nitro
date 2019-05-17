import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import './LargeSongControls.css'

class LargeSongControls extends Component {

  render() {
    return (
      <Menu
        inverted borderless
        fixed="bottom"
        id="bottom-menu"
      >
      </Menu>
    );
  }

}

export default LargeSongControls;
