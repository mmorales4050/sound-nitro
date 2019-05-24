import React, { Component } from 'react';
import { Menu, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import './MobileSongControls.css'

class MobileSongControls extends Component {

  render() {
    return (
      <Menu
        inverted borderless
        fixed="bottom"
        id="bottom-menu-mobile"
      >
      <Menu.Item>
      <Image src="https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg"/>
      <div className="song-info">
      <div className="song-name">{this.props.currentTrack === null ? "" : this.props.currentTrack.name}</div>
      <div className="song-artist">{this.props.currentTrack === null ? "" : this.props.currentTrack.artist}</div>
      </div>
      </Menu.Item>
      <Menu.Item>
      </Menu.Item>
      </Menu>
    );
  }



}

const mapStateToProps = (store) => ({
  currentTrack: store.currentTrack,
  playing: store.playing
})

export default connect(mapStateToProps)(MobileSongControls);
