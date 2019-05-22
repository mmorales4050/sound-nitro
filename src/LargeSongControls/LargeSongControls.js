import React, { Component } from 'react';
import { Menu, Image, Icon, Progress} from 'semantic-ui-react'
import './LargeSongControls.css'
import {connect} from 'react-redux'

class LargeSongControls extends Component {
  state = {time: 0}

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: this.state.time + 1})
    }, 200)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  toggleAudio = () => {
    if (this.props.current_track != null){
      this.props.dispatch({type: "TOGGLE_AUDIO"})
    }
  }

  formatTime = (secs) => {
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
      <Image src="http://www.baronblaze.com/wp-content/uploads/2015/12/music-placeholder.png"/>
      <div className="song-info">
      <div className="song-name">{this.props.current_track === null ? "" : this.props.current_track.info.song.name}</div>
      <div className="song-artist">{this.props.current_track === null ? "" : this.props.current_track.info.song.artist}</div>
      </div>
      </Menu.Item>
      <Menu.Item className="song-controls-item">
      <div className="song-controls">
      <Icon name="shuffle"/>
      <Icon name="step backward"/>
      <Icon name={this.props.playing ? "pause circle outline" : "play circle outline"} id="play-button" onClick={this.toggleAudio}/>
      <Icon name="step forward"/>
      <Icon name="sync"/>
      </div>
      <div className="song-progress">
      <div className="time-stamp">{this.props.track_duration === 0 ? "0:00" : this.formatTime(Math.round(this.props.current_track.howl.seek()))}</div>
      <Progress percent={this.props.track_duration === 0 ? 0 : (this.props.current_track.howl.seek() / this.props.track_duration)*100} size='tiny'/>
      <div className="time-stamp">{this.props.track_duration === 0 ? "0:00" : this.formatTime(Math.round(this.props.track_duration))}</div>
      </div>
      </Menu.Item>
      <Menu.Item className="volume-controls">
      <Icon name="list" size="" className="current-playlist"/>
      <Icon name="volume up" size=""/>
      <Progress percent={100} size='tiny'/>
      </Menu.Item >
      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  current_track: store.current_track,
  playing: store.playing,
  track_duration: store.track_duration
})

export default connect(mapStateToProps)(LargeSongControls);
