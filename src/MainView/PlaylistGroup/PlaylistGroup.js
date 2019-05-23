import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import './PlaylistGroup.css'
import {Card} from 'semantic-ui-react'
import {connect} from 'react-redux'

class PlaylistGroup extends Component {

  render() {
    return (
      <Card.Group className="playlist-card-container"
      centered
      >
      {this.props.playlists.map(playlist=> {
        return (
          <PlaylistCard playlist={playlist}/>
        )
      })}
      </Card.Group>
    );
  }

}

const mapStateToProps = (store) => ({
  playlists: store.playlists
})

export default connect(mapStateToProps)(PlaylistGroup);
