import React, { Component } from 'react';
import './SongMenuItem.css'
import {List, Icon, Menu, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Howl} from 'howler'

class SongMenuItem extends Component {

  songClicked = (event) => {
    this.props.dispatch({type: "SET_AND_PLAY_CURRENT_TRACK", payload: {howl: new Howl({
      src: [this.props.song.audio],
      onload: () => {
        this.props.dispatch({type: "SET_DURATION"})
      }
    }), info: this.props.song}
  })
  }


  render() {
    return (
      <Menu.Item as="a" id="song-menu-item" className={""}>
      <List horizontal inverted>

      <List.Item>
  <List.Content>
    <List.Header id={""}><List.Icon name='play' size='large' onClick={this.songClicked}/>{this.props.song.song.name}<span id="song-duration">4:20</span></List.Header>
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
