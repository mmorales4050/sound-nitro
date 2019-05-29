import React, { Component } from 'react';
import PlaylistSongs from '../PlaylistShowPage/PlaylistSongs/PlaylistSongs'
import './QueuePage.css'
import {connect} from 'react-redux'
class QueuePage extends Component {

  render() {
    return (
      <div className="play-queue-container">
      <div className="play-queue-top-container">Play Queue</div>
      <div className="play-queue-bottom-container">
      <PlaylistSongs songs={this.props.queue}/>
      </div>
      <div id="filler-item">
      </div>
      </div>
    );
  }

}

const mapStateToProps = (store) => ({
  queue: store.queue
})

export default connect(mapStateToProps)(QueuePage);
