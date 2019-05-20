import React, { Component } from 'react';
import {List, Input, Segment, Label} from 'semantic-ui-react'

import './SongInputField.css'

class SongInputField extends Component {

  render() {
    var name = this.props.song.name.split("-")
    var title = name[1].trim()
    var author = name[0].trim()
    return (
      <List.Item id="song-input-item">
<List horizontal id="horizontal-input-item-list">
<List.Item>
<List.Content>
<List.Header>File</List.Header>
<Label id="file-name">{this.props.song.name}</Label>
</List.Content>
</List.Item>
  <List.Item>
  <List.Content>
  <List.Header>Title</List.Header>
  <Input placeholder='' id="song-input" defaultValue={title}/>
  </List.Content>
  </List.Item>
  <List.Item><List.Content>
  <List.Header>Artist</List.Header>
  <Input placeholder='' id="song-input" defaultValue={author}/>
  </List.Content></List.Item>
</List>
</List.Item>
    );
  }

}



export default SongInputField;
