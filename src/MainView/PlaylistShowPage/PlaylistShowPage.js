import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import PlaylistSongs from './PlaylistSongs/PlaylistSongs';
import {Button } from 'semantic-ui-react'
import './PlaylistShowPage.css'
import {connect} from 'react-redux'
import {playPlaylist} from '../../redux/actionCreators'

class PlaylistShow extends Component {

  playPlaylist = () => {
    this.props.playPlaylist(this.props.displayPlaylist)
  }

  render() {
    return (
      <div id="playlist-show-container">
      <div className="top-container">
      <PlaylistCard playlist={this.props.displayPlaylist}/>

      <div className="playlist-info">
      <div className="title">
      {this.props.displayPlaylist.name}
      </div>
      <div className="song-number">
      {this.props.displayPlaylist.songs.length} SONGS
      </div>
      <Button circular content={
        this.props.playing && this.props.displayPlaylist === this.props.currentPlaylist ? "PAUSE" : "PLAY"
      } onClick={this.playPlaylist}/>
      </div>
      </div>
      <div className="playlist-song-container">
      <PlaylistSongs songs={this.props.displayPlaylist.songs}/>
      </div>
      <div id ="filler-item">
      </div>

      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  playPlaylist: (playlist) => {dispatch(playPlaylist(playlist))}
})

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist,
  queue: store.queue,
  playing: store.playing,
  howl: store.howl,
  currentPlaylist: store.currentPlaylist
})


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistShow);
