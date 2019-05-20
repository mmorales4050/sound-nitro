import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect'
import UploadPage from './UploadPage/UploadPage'
import SongsPage from './SongsPage/SongsPage'
import './MainView.css'

class MainView extends Component {

  render() {
    return (
      <div
        className={isMobileOnly ?
           "main-view-mobile"
            :
          "main-view"
        }
      >
      <SongsPage />
      </div>
    );
  }

}

export default MainView;
