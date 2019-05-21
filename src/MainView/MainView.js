import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect'
import UploadPage from './UploadPage/UploadPage'
import SongsPage from './SongsPage/SongsPage'
import PlaylistPage from './PlaylistPage/PlaylistPage'
import './MainView.css'
import {connect} from 'react-redux'


class MainView extends Component {

  showPage = () => {
    switch(this.props.page){
      case "songs":
        return <SongsPage />
      case "upload":
        return <UploadPage />
      case "playlists":
        return <PlaylistPage />
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
