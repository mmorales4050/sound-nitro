import React, { Component } from 'react';
import './MobileMenu.css'
import { Menu, Icon } from 'semantic-ui-react'

class MobileMenu extends Component {

  render() {
    return (
      <Menu
        inverted
        fixed="top"
        id="mobile-menu"
      >
      <Menu.Item as="a" id="menu-item" content="Upload">
        <Icon name='cloud upload' id="menu-icon" size="large"/>
      </Menu.Item>
      <Menu.Item as="a" id="menu-item" content="Upload">
        <Icon name='music' id="menu-icon" size="large"/>
      </Menu.Item>
      </Menu>
    );
  }

}

export default MobileMenu;
