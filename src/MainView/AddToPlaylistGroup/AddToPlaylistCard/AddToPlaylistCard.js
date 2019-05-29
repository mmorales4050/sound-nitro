import React, { Component } from 'react';
import { Card, Image, Icon} from 'semantic-ui-react'
import './AddToPlaylistCard.css'
import  {connect} from 'react-redux';
import '../../../api'


class AddToPlaylistCard extends Component {
  state = {
    icon: ""
  }

  addToPlaylist = () => {
    if(!this.props.playlist.songs.map(song=>song.id).includes(this.props.selectedSong.id)){
      fetch(URL + "/playlist_songs", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          playlistId: this.props.playlist.id,
          songId: this.props.selectedSong.id
        })
      })
      .then(response=>response.json())
      .then(response=>{
        var newPlaylists = [...this.props.playlists]
        newPlaylists[newPlaylists.indexOf(this.props.playlist)] = response
        this.props.dispatch({type: "SET_PLAYLISTS", payload: newPlaylists})
      })
    }
    this.props.dispatch({type: "SET_ADDTOPLAYLIST", payload: null})
  }

  render() {
    return (
      <Card id="album-card">
      <div className="place-holder"style={{backgroundImage: `url(${this.props.playlist.image})`}} onMouseEnter={()=>this.setState({icon:"plus circle"})} onMouseLeave={()=>this.setState({icon:""})} onClick={this.addToPlaylist}>
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
  selectedSong: store.selectedSong,
  playlists: store.playlists
})

export default connect(mapStateToProps)(AddToPlaylistCard);
