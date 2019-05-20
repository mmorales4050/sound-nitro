import React, { Component } from 'react';
import './SongMenuItem.css'
import {List, Icon, Menu, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

class SongMenuItem extends Component {

  songClicked = (event) => {
    this.props.dispatch({type: "SET_CURRENT_TRACK", payload: this.props.song.audio})
  }
  render() {
    return (
      <Menu.Item as="a" id="menu-item" className={""}>
      <List horizontal inverted>
      <List.Item>

      </List.Item>
      <List.Item>

  <List.Content>
    <List.Header id={""}><List.Icon name='play' size='large' onClick={this.songClicked}/>{this.props.song.song.name}</List.Header>
    <List.Description  id = "item-description">{this.props.song.song.artist}</List.Description>
  </List.Content>
</List.Item>
      </List>
      </Menu.Item>
    );
  }

}

const mapStateToProps = (store) => ({
  current_track: store.current_track
})

export default connect(mapStateToProps)(SongMenuItem);
