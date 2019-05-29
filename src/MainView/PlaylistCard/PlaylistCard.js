import React, { Component } from 'react';
import { Card, Transition, Icon} from 'semantic-ui-react'
import './PlaylistCard.css'
import  {connect} from 'react-redux';
import {playPlaylist, gotoPlaylistPage} from "../../redux/actionCreators"


class PlaylistCard extends Component {
  state = {
    icon: "music",
    visible: true
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  icon = () => {
    if (this.props.currentPlaylist === this.props.playlist){
      if (this.props.playing){
        return "pause circle outline"
      }else {
        return "play circle outline"
      }
    }else{
      return "play circle outline"
    }
  }

  gotoPlaylist = async () => {
    if (this.state.icon === "music" && this.props.page === "playlists"){
      this.setState({visible: !this.state.visible})
      await this.sleep(200)
      this.props.gotoPlaylistPage(this.props.playlist)
    }
  }

  playPlaylist = () => {
    this.setState({visible: !this.state.visible})
    this.props.playPlaylist(this.props.playlist)
  }



  render() {
    return (
      <Transition animation={"pulse"} duration={200} visible={this.state.visible}>
      <Card id="album-card">
      <div className="place-holder" style={{backgroundImage: `url(${this.props.playlist.image})`}} onClick={this.gotoPlaylist}>
      <Icon name={this.icon()} size="huge" inverted onMouseEnter={()=>this.setState({icon:"play circle outline"})} onMouseLeave={()=>this.setState({icon:"music"})} onClick={this.playPlaylist}/>

      </div>
    <Card.Content id="album-info">
    <div onClick={this.gotoPlaylist}>{this.props.playlist.name}</div>
    </Card.Content>
      </Card>
    </Transition>
    );
  }

}
const mapDispatchToProps = (dispatch) => ({
  playPlaylist: (playlist) => {dispatch(playPlaylist(playlist))},
  gotoPlaylistPage: (playlist => {
    dispatch(gotoPlaylistPage(playlist))
  })
})

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist,
  currentPlaylist: store.currentPlaylist,
  loading: store.loading,
  howl: store.howl,
  playing: store.playing,
  page: store.page
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard);
