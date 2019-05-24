import {connect} from 'react-redux'


const Player = class {
  static constructor = (songs) => {
    this.songs = songs
    this.index = 0
  }


}

const mapStateToProps = (store) => ({
  currentTrack: store.currentTrack,
  playing: store.playing,
  queue: store.queue,
  songs: store.songs
})

export default connect(mapStateToProps)(Player);
