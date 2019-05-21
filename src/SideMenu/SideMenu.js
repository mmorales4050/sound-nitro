import React, { Component } from 'react';
import './SideMenu.css'
import { Header, Icon, Menu,Sidebar } from 'semantic-ui-react'
import  {connect} from 'react-redux';

class SideMenu extends Component {

  uploadPage = (page) => {
    this.props.dispatch({type: "CHANGE_PAGE", payload: page})
  }

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

        <Menu.Item as="a" id="menu-item" onClick={()=>this.uploadPage("upload")}>
          <Icon name='cloud upload' id="menu-icon"/>
          <span>Upload</span>
        </Menu.Item>
        <Menu.Item as="a" id="menu-item" onClick={()=>this.uploadPage("songs")}>
          <Icon name='music' id="menu-icon"/>
          <span>Songs</span>
        </Menu.Item>
        <Menu.Item as="a" id="menu-item"  onClick={()=>this.uploadPage("playlists")}>
          <Icon name='list' id="menu-icon"/>
          <span>Playlists</span>
        </Menu.Item>
        <Menu.Item as="a" id="menu-item" onClick={()=>this.uploadPage("audiobooks")}>
          <Icon name='book' id="menu-icon"/>
          <span>Audiobooks</span>
        </Menu.Item>
        <Menu.Item className="filler-item" id="menu-item">
        </Menu.Item>
        <Menu.Item as="a" className="account-item borderless" id="menu-item" onClick={()=>this.uploadPage("account")}>
          <Icon name='user' id="menu-icon"/>
          <span>Account</span>
        </Menu.Item>
      </Sidebar>
    );
  }

}

const mapStateToProps = (store) => ({
  page: store.page
})

export default connect(mapStateToProps)(SideMenu);
