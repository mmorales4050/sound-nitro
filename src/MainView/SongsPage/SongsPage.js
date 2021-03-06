import React, { Component } from 'react';
import  {connect} from 'react-redux';
import PlaylistSongs from '../PlaylistShowPage/PlaylistSongs/PlaylistSongs'
import './SongsPage.css'


class SongsPage extends Component {

  render() {
    return (
      <div className="play-queue-container">
      <div className="play-queue-top-container">Songs</div>
      <div className="play-queue-bottom-container">
      <PlaylistSongs songs={this.props.songs}/>
      </div>
      <div id="filler-item">
      </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  songs: store.songs
})

export default connect(mapStateToProps)(SongsPage);
