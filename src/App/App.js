import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import LargeSongControls from '../LargeSongControls/LargeSongControls';
import SideMenu from '../SideMenu/SideMenu'
import MobileSongControls from '../MobileSongControls/MobileSongControls'
import MobileMenu from '../MobileMenu/MobileMenu'
import MainView from '../MainView/MainView'
import { isMobileOnly } from 'react-device-detect'



function App() {
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

export default App;
