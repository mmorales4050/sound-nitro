import React, { Component } from 'react';
import { Button, Icon, Form} from 'semantic-ui-react'
import './UploadPage.css'
import * as api from "../../Api/Api"

class UploadPage extends Component {

  fileChange = (event) => {
    event.persist()
    console.log(event.target.files)
  }

  render() {
    return (
      <div className="upload-page">
      <Form>
        <Button as="label" htmlFor="file" color="orange" size="massive" circular>
        <Icon name='upload' />
        Upload Song

        </Button>
        <input
                  type="file"
                  id="file"
                  multiple="multiple"
                  hidden
                  onChange={this.fileChange}
                />
        </Form>
      </div>
    );
  }

}

export default UploadPage;
