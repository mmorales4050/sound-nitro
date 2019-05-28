import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'
import SongMenuItem from '../../SongMenuItem/SongMenuItem'
import './PlaylistSongs.css'

class PlaylistSongs extends Component {

  render() {
    return (
      <Menu secondary vertical id="song-menu">

      {this.props.songs.map(song => {
          return (
            <SongMenuItem song={song} key={song.id}/>
          )
        })
      }
      </Menu>
    );
  }

}

export default PlaylistSongs;
