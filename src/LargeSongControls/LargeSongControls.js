import React, { Component } from 'react';
import { Menu, Image} from 'semantic-ui-react'
import './LargeSongControls.css'
import {connect} from 'react-redux'

class LargeSongControls extends Component {

  render() {
    console.log()
    return (
      <Menu
        inverted borderless
        fixed="bottom"
        id="bottom-menu"
      >
      <Menu.Item id="now-playing">
      <Image />
      </Menu.Item >
      <Menu.Item >

      </Menu.Item >
      <Menu.Item >

      </Menu.Item >

      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  current_track: store.current_track
})

export default connect(mapStateToProps)(LargeSongControls);
