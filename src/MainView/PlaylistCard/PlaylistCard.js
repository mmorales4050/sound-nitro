import React, { Component } from 'react';
import { Card, Image, Icon} from 'semantic-ui-react'
import './PlaylistCard.css'
import  {connect} from 'react-redux';
import {Howl} from 'howler'
import {playPlaylist} from "../../redux/actionCreators"


class PlaylistCard extends Component {
  state = {
    icon: "music"
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
      this.props.dispatch({type: "SET_DISPLAYPLAYLIST", payload: this.props.playlist})
      this.props.dispatch({
        type: "SET_PAGE", payload: "playlist"
      })
    }
  }

  playPlaylist2 = () => {
    this.props.playPlaylist(this.props.playlist.songs)
  }

  playPlaylist1 = () => {
    console.log("hit")
    if (this.props.howl === null && this.props.loading === false){
      this.props.dispatch({
        type: "SET_CURRENTPLAYLIST", payload: this.props.playlist
      })
      this.props.dispatch({
        type: "SET_QUEUE", payload: this.props.playlist.songs
      })
      this.props.dispatch({
        type: "SET_ORIGNALQUEUE", payload: this.props.playlist.songs
      })
      this.play(0, this.props.playlist.songs)
    }else if(this.props.loading === false && this.props.howl !== null){
      if (this.props.playing) {
        this.props.howl.pause()
      }else {
        this.props.howl.play()
      }
    }

  }

  render() {
    return (
      <Card id="album-card">
      <div className="place-holder" onClick={this.gotoPlaylist}>
      <Icon name={this.state.icon} size="huge" inverted onMouseEnter={()=>this.setState({icon:"play circle outline"})} onMouseLeave={()=>this.setState({icon:"music"})} onClick={this.playPlaylist2}/>

      </div>
    <Card.Content id="album-info">
    <div onClick={this.gotoPlaylist}>{this.props.playlist.name}</div>
    </Card.Content>
      </Card>
    );
  }

}
const mapDispatchToProps = (dispatch) => ({
  playPlaylist: (songs) => {dispatch(playPlaylist(songs))}
})

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist,
  currentPlaylist: store.currentPlaylist,
  loading: store.loading,
  howl: store.howl
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard);
