import React, { Component } from 'react';
import { Card, Image, Icon} from 'semantic-ui-react'
import './PlaylistCard.css'
import  {connect} from 'react-redux';
import {Howl} from 'howler'
import {playPlaylist, gotoPlaylistPage} from "../../redux/actionCreators"


class PlaylistCard extends Component {
  state = {
    icon: "music"
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

  play = (index, queue=this.props.queue) => {
      var howl = new Howl({
            src: queue[index].url,
            onplay: () => {
              this.props.dispatch({type: "SET_PLAYING", payload: true})
            },
            onload: () => {
              this.props.howl.play()
            },
            onend: () => {
              this.skip()
            },
            onpause: () => {
              this.props.dispatch({type: "SET_PLAYING", payload: false})
            }
          })
      this.props.dispatch({type: "SET_INDEX", payload: index})
      this.props.dispatch({type: "SET_CURRENTTRACK", payload: queue[index]})
      this.props.dispatch({type: "SET_HOWL", payload: howl
    })
  }

  gotoPlaylist = () => {
    if (this.state.icon === "music"){
      this.props.gotoPlaylistPage(this.props.playlist)
    }
  }

  playPlaylist = () => {
    this.props.playPlaylist(this.props.playlist)
  }



  render() {
    return (
      <Card id="album-card">
      <div className="place-holder" style={{backgroundImage: `url(${this.props.playlist.image})`}} onClick={this.gotoPlaylist}>
      <Icon name={this.icon()} size="huge" inverted onMouseEnter={()=>this.setState({icon:"play circle outline"})} onMouseLeave={()=>this.setState({icon:"music"})} onClick={this.playPlaylist}/>

      </div>
    <Card.Content id="album-info">
    <div onClick={this.gotoPlaylist}>{this.props.playlist.name}</div>
    </Card.Content>
      </Card>
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
  playing: store.playing
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard);
