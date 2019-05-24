import React, { Component } from 'react';
import './MobileMenu.css'
import { Menu, Icon } from 'semantic-ui-react'
import  {connect} from 'react-redux';

class MobileMenu extends Component {

  uploadPage = (page) => {
    this.props.dispatch({type: "SET_PAGE", payload: page})
  }
  render() {
    return (
      <Menu
        inverted
        fixed="top"
        id="mobile-menu"
      >
      <Menu.Item as="a" id="menu-item-mobile" content="Upload" onClick={()=>this.uploadPage("upload")}>
        <Icon name='cloud upload' id="menu-icon" size="large"/>
      </Menu.Item>
      <Menu.Item as="a" id="menu-item-mobile" content="Music" onClick={()=>this.uploadPage("songs")}>
        <Icon name='music' id="menu-icon" size="large"/>
      </Menu.Item>
      <Menu.Item as="a" id="menu-item-mobile" content="Music" onClick={()=>this.uploadPage("playlists")}>
        <Icon name='list alternate' id="menu-icon" size="large"/>
      </Menu.Item>
      <Menu.Item as="a" id="menu-item-mobile" content="Music" onClick={()=>this.uploadPage("audiobooks")}>
        <Icon name='book' id="menu-icon" size="large"/>
      </Menu.Item>
      <Menu.Item as="a" id="menu-item-mobile" content="Music" onClick={()=>this.uploadPage("account")}>
        <Icon name='user' id="menu-icon" size="large"/>
      </Menu.Item>
      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  page: store.page
})


export default connect(mapStateToProps)(MobileMenu);
