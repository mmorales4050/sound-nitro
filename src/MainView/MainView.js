import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect'
import UploadPage from './UploadPage/UploadPage'
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
      <UploadPage />
      </div>
    );
  }

}

export default MainView;
