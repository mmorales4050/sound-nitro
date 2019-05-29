import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import LargeSongControls from '../LargeSongControls/LargeSongControls';
import SideMenu from '../SideMenu/SideMenu'
import MobileSongControls from '../MobileSongControls/MobileSongControls'
import MobileMenu from '../MobileMenu/MobileMenu'
import MainView from '../MainView/MainView'
import { isMobileOnly } from 'react-device-detect'
import {connect} from 'react-redux'
import '../api'


class App extends Component {

  componentDidMount() {
    fetch(URL + "songs")
    .then(response => response.json())
    .then((response) => this.props.dispatch({type: "SET_SONGS", payload: response}))
    .then(()=>{
      fetch(URL + "playlists")
      .then(response => response.json())
      .then((response) => {
         this.props.dispatch({type: "SET_QUEUE", payload: this.props.songs})
         this.props.dispatch({type: "SET_ORIGNALQUEUE", payload: this.props.songs})
         this.props.dispatch({type: "SET_PLAYLISTS", payload: response})
         this.props.dispatch({type: "SET_LOADING", payload: false})
      })
    })
    this.props.dispatch({type: "SET_LOADING", payload: true})
  }

  render() {
  return (
      <>
      {isMobileOnly ?
        <div className="mobile-app">
          <MobileMenu />
          <MainView />
          <MobileSongControls />
        </div>
        :
        <div className="app">
          <LargeSongControls />
          <MainView />
          <SideMenu />
        </div>
      }
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  songs: store.songs,
  index: store.index,
  loading: store.loading
})

export default connect(mapStateToProps)(App);
