import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import './LargeSongControls.css'
import {connect} from 'react-redux'

class LargeSongControls extends Component {

  render() {
    return (
      <Menu
        inverted borderless
        fixed="bottom"
        id="bottom-menu"
      >
      {this.props.current_track === ""?null:
        <audio controls>
        <source src={this.props.current_track} />
        </audio>

      }

      <div></div>
      </Menu>
    );
  }

}

const mapStateToProps = (store) => ({
  current_track: store.current_track
})

export default connect(mapStateToProps, null)(LargeSongControls);
