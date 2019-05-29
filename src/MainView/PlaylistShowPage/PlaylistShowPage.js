import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import PlaylistSongs from './PlaylistSongs/PlaylistSongs';
import {Button } from 'semantic-ui-react'
import './PlaylistShowPage.css'
import {connect} from 'react-redux'
import {Howl} from 'howler'


class PlaylistShow extends Component {

  playClicked = () => {
    if (this.props.howl === null && this.props.loading === false){
      this.play(0)
    }else if(this.props.loading === false && this.props.howl !== null){
      if (this.props.playing) {
        this.props.howl.pause()
      }else {
        this.props.howl.play()
      }
    }
  }

  play = (index) => {
      var howl = new Howl({
            src: this.props.queue[index].url,
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
      this.props.dispatch({type: "SET_CURRENTTRACK", payload: this.props.queue[index]})
      this.props.dispatch({type: "SET_HOWL", payload: howl
    })
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
      <Button circular content={!this.props.playing ? "PLAY" : "PAUSE"} onClick={this.playClicked}/>
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

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist,
  queue: store.queue,
  playing: store.playing,
  howl: store.howl
})


export default connect(mapStateToProps)(PlaylistShow);
