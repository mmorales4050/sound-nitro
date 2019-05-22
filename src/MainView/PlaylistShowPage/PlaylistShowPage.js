import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import SongsPage from '../SongsPage/SongsPage'
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
      13 SONGS
      </div>
      <Button circular content="PLAY"/>
      </div>
      </div>
      <div className="playlist-song-container">
      <SongsPage />
      </div>

      </>
    );
  }

}

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist
})


export default connect(mapStateToProps)(PlaylistShow);
