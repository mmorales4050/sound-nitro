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
      <div className="song-name">{this.props.current_track === null ? "" : this.props.current_track.name}</div>
      <div className="song-artist">{this.props.current_track === null ? "" : this.props.current_track.artist}</div>
      </div>
      </Menu.Item>
      <Menu.Item>
      </Menu.Item>
      </Menu>
    );
  }



}

const mapStateToProps = (store) => ({
  current_track: store.current_track,
  playing: store.playing,
  track_duration: store.track_duration
})

export default connect(mapStateToProps)(MobileSongControls);
