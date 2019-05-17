import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import './MobileSongControls.css'

class MobileSongControls extends Component {

  render() {
    return (
      <Menu
        inverted borderless
        fixed="bottom"
        id="bottom-menu-mobile"
      >
      </Menu>
    );
  }

}

export default MobileSongControls;
