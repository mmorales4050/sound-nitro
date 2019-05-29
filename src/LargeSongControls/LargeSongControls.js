import React, { Component } from 'react';
import { Menu, Image, Icon, Progress} from 'semantic-ui-react'
import './LargeSongControls.css'
import {connect} from 'react-redux'
import {Howl} from 'howler'

class LargeSongControls extends Component {
  state = {
    time: 0,
    shuffled: false

  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: this.state.time + 1})
    }, 200)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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

  toggleAudio = () => {
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

  skip = () => {
    if (this.props.queue != null && this.props.index + 1 < this.props.queue.length){
      this.props.howl.stop()
      this.play(this.props.index + 1)
      this.props.dispatch({type: "SET_CURRENTTRACK", payload: this.props.queue[this.props.index + 1]})
      this.props.dispatch({type: "SET_INDEX", payload: this.props.index + 1})
    }
  }

  back = () => {
    if (this.props.queue !== null && this.props.index !== 0){
      this.props.howl.stop()
      this.play(this.props.index - 1)
      this.props.dispatch({type: "SET_INDEX", payload: this.props.index - 1})
    }
  }

  shuffle = () => {
    if (this.props.loading === false){
      if (!this.state.shuffled) {
        this.setState({shuffled: true})
        this.props.dispatch({type: "SET_SHUFFLE", payload: true})
        var shuffledQueue = [...[...this.props.queue].sort(() => Math.random() - 0.5)]
        this.props.dispatch({type: "SET_QUEUE", payload: [...shuffledQueue]})
        if (this.props.currentTrack !== null){
          shuffledQueue.splice(shuffledQueue.indexOf(this.props.currentTrack), 1)
          this.props.dispatch({type: "SET_QUEUE", payload: [this.props.currentTrack, ...shuffledQueue]})
        }
        this.props.dispatch({type: "SET_INDEX", payload: 0})
      }else {
        this.setState({shuffled: false})
        this.props.dispatch({type: "SET_SHUFFLE", payload: false})
        this.props.dispatch({type: "SET_QUEUE", payload: this.props.originalQueue})
        this.props.dispatch({type: "SET_INDEX", payload: this.props.originalQueue.indexOf(this.props.currentTrack)})
      }
    }
  }

  formatTime = (secs) => {
    secs = Math.round(secs)
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <Menu
        inverted borderless
        fixed="bottom"
        id="bottom-menu"
      >
      <Menu.Item id="now-playing">
      <div className="place-holder-image">
      {this.props.currentTrack !== null ? <img src={this.props.currentTrack.image} alt=""/> : null}

      </div>
      <div className="song-info">
      <div className="song-name">{this.props.currentTrack === null ? "" : this.props.currentTrack.name}</div>
      <div className="song-artist">{this.props.currentTrack === null ? "" : this.props.currentTrack.artist}</div>
      </div>
      </Menu.Item>
      <Menu.Item className="song-controls-item">
      <div className="song-controls">
      <Icon name="shuffle" onClick={this.shuffle} className={`shuffled${this.state.shuffled}`}/>
      <Icon name="step backward" onClick={this.back}/>
      <Icon name={this.props.playing ? "pause circle outline" : "play circle outline"} id="play-button" onClick={this.toggleAudio}/>
      <Icon name="step forward" onClick={this.skip}/>
      <Icon name="sync"/>
      </div>
      <div className="song-progress">
      <div className="time-stamp">{!this.props.howl ? "0:00" : this.formatTime(Math.round(this.props.howl.seek()))}</div>
      <Progress percent={!this.props.howl ? 0 : (this.props.howl.seek() / this.props.howl.duration())*100} size='tiny'/>
      <div className="time-stamp">{!this.props.currentTrack ? "0:00" : this.formatTime(this.props.currentTrack.duration)}</div>
      </div>
      </Menu.Item>
      <Menu.Item className="volume-controls">
      <Icon name="list" className="current-playlist" onClick={()=> {
        this.props.dispatch({type: "SET_PAGE", payload: "queue"})
      }}/>
      <div className="temp-hide">
      <Icon name="volume up" />
      <Progress percent={100} size='tiny'/>
      </div>
      </Menu.Item >
      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  currentTrack: store.currentTrack,
  playing: store.playing,
  queue: store.queue,
  index: store.index,
  howl: store.howl,
  originalQueue: store.originalQueue,
  loading: store.loading,
  shuffle: store.shuffle
})

export default connect(mapStateToProps)(LargeSongControls);
