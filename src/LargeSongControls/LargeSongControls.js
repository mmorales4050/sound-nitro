import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
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

      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  current_track: store.current_track
})

export default connect(mapStateToProps)(LargeSongControls);
