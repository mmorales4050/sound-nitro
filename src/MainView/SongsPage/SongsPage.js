import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'
import  {connect} from 'react-redux';
import SongMenuItem from '../SongMenuItem/SongMenuItem'
import './SongsPage.css'

class SongsPage extends Component {

  render() {
    return (
      <Menu secondary vertical id="song-menu">

      {this.props.songs.map(song => {
          return (
            <SongMenuItem song={song} />
          )
        })
      }
      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  songs: store.songs
})

export default connect(mapStateToProps)(SongsPage);
