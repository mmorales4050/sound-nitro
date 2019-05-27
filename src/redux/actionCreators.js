import Howl from 'howler'
import {connect} from 'react-redux'
import React, { Component } from 'react';


class ActionCreators extends Component {

play = (index) => {
    this.props.dispatch({type: "SET_HOWL", payload: new Howl({
          src: this.props.queue[index].url,
          onplay: () => {
            this.props.dispatch({type: "SET_INDEX", payload: index})
            this.props.dispatch({type: "SET_CURRENTTRACK", payload: this.props.queue[index]})
            this.props.dispatch({type: "SET_PLAYING", payload: true})
          },
          onend: () => {
            this.play(this.props.index + 1)
            this.props.dispatch({type: "SET_INDEX", payload: this.props.index + 1})
          },
          onpause: () => {
            this.props.dispatch({type: "SET_PLAYING", payload: false})
          }
        })
  })
  this.props.howl.play()
}

render() {
return (
  <div></div>
  )
}

}
const mapStateToProps = (store) => ({
  songs: store.songs,
  index: store.index,
  howl: store.howl
})

export default connect(mapStateToProps)(ActionCreators);
