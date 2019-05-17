import React, { Component } from 'react';
import './SideMenu.css'
import { Header, Icon, Menu,Sidebar } from 'semantic-ui-react'

class SideMenu extends Component {

  render() {
    return (
      <Sidebar
      as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={true}
          width="wide"
          id="side-menu"
      >
        <Header as='h3' id="header">
          <img src="whiteIcon.png" alt=""/>
          <Header.Content>Sound Nitro</Header.Content>
        </Header>

        <Menu.Item as="a" id="menu-item" content="Upload">
          <Icon name='cloud upload' id="menu-icon"/>
          <span>Upload</span>
        </Menu.Item>
        <Menu.Item as="a" id="menu-item" content="Upload">
          <Icon name='music' id="menu-icon"/>
          <span>Songs</span>
        </Menu.Item>
      </Sidebar>
    );
  }

}

export default SideMenu;
