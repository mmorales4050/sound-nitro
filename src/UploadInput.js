import React, { Component } from 'react';

class UploadInput extends Component {

  readFile(file) {
      if (file && file[0]) {
        let formPayLoad = new FormData();
        formPayLoad.append('uploaded_image', files[0]);
        this.sendImageToController(formPayLoad)
    }
  }

  render() {
    return (
      <div>
        <input type='file' onClick={this.readFile}/>
      </div>
    );
  }

}

export default UploadInput;
