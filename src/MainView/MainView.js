import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect'
import UploadPage from './UploadPage/UploadPage'
import SongsPage from './SongsPage/SongsPage'
import PlaylistPage from './PlaylistPage/PlaylistPage'
import './MainView.css'
import QueuePage from './QueuePage/QueuePage'
import {connect} from 'react-redux'
import PlaylistShowPage from './PlaylistShowPage/PlaylistShowPage'


class MainView extends Component {

  showPage = () => {
    switch(this.props.page){
      case "songs":
        return <SongsPage />
      case "upload":
        return <UploadPage />
      case "playlists":
        return <PlaylistPage />
      case "playlist":
        return <PlaylistShowPage />
      case "queue":
        return <QueuePage />
      default:
        return null
    }
  }
  render() {
    return (
      <div
        className={isMobileOnly ?
           "main-view-mobile"
            :
          "main-view"
        }
      >
      {this.showPage()}
      </div>
    );
  }

}

const mapStateToProps = (store) => ({
  page: store.page
})

export default connect(mapStateToProps)(MainView);
