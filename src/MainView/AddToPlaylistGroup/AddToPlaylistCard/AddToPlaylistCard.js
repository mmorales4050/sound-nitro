import React, { Component } from 'react';
import { Card, Image, Icon} from 'semantic-ui-react'
import './AddToPlaylistCard.css'
import  {connect} from 'react-redux';
import '../../../api'


class AddToPlaylistCard extends Component {
  state = {
    icon: "music"
  }

  addToPlaylist = () => {
    console.log(this.props.playlist.id)
    console.log(this.props.selectedSong.song.id)
    fetch(URL + "/playlist_songs")
  }

  render() {
    return (
      <Card id="album-card">
      <div className="place-holder" onMouseEnter={()=>this.setState({icon:"plus circle"})} onMouseLeave={()=>this.setState({icon:"music"})} onClick={this.addToPlaylist}>
      <Icon name={this.state.icon} size="huge" inverted/>

      </div>
    <Card.Content id="album-info">
    <div>{this.props.playlist.name}</div>
    </Card.Content>
      </Card>
    );
  }

}

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist,
  selectedSong: store.selectedSong
})

export default connect(mapStateToProps)(AddToPlaylistCard);
