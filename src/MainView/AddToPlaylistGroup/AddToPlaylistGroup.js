import React, { Component } from 'react';
import AddToPlaylistCard from './AddToPlaylistCard/AddToPlaylistCard';
import './AddToPlaylistGroup.css'
import {Card} from 'semantic-ui-react'
import {connect} from 'react-redux'

class AddToPlaylistGroup extends Component {

  render() {
    return (
      <Card.Group className="playlist-card-container"
      centered
      >
      {this.props.playlists.map(playlist=> {
        return (
          <AddToPlaylistCard playlist={playlist}/>
        )
      })}
      </Card.Group>
    );
  }

}

const mapStateToProps = (store) => ({
  playlists: store.playlists
})

export default connect(mapStateToProps)(AddToPlaylistGroup);
