import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import PlaylistSongs from './PlaylistSongs/PlaylistSongs';
import {Button } from 'semantic-ui-react'
import './PlaylistShowPage.css'
import {connect} from 'react-redux'

class PlaylistShow extends Component {

  render() {
    return (
      <>
      <div className="top-container">
      <PlaylistCard playlist={this.props.displayPlaylist}/>

      <div className="playlist-info">
      <div className="title">
      {this.props.displayPlaylist.name}
      </div>
      <div className="song-number">
      {this.props.displayPlaylist.songs.length} SONGS
      </div>
      <Button circular content="PLAY"/>
      </div>
      </div>
      <div className="playlist-song-container">
      <PlaylistSongs songs={this.props.displayPlaylist.songs}/>
      </div>

      </>
    );
  }

}

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist
})


export default connect(mapStateToProps)(PlaylistShow);
