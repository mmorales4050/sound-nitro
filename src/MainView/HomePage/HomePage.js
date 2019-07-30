import React, { Component } from 'react';

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Icon
} from 'semantic-ui-react'

import LoginForm from '../LoginForm/LoginForm';
import CreateAccountForm from '../CreateAccountForm/CreateAccountForm';
import './HomePage.css'

class HomePage extends Component {

  render() {

    return (
      <div>
    <Menu fixed='top' inverted>
      <Container className="home-nav">
        <Menu.Item as='a' header>
          <Image size='mini' src='whiteIcon.png' style={{ marginRight: '1.5em' }} />
          Sound Nitro
        </Menu.Item>
        <Menu.Item as='a' header>Login</Menu.Item>
        <Menu.Item as='a' header>Sign Up</Menu.Item>
      </Container>
    </Menu>

      <div className="home-background">
      <div className="home-tag-line">Your Music Anywhere.</div>
      </div>

    <Segment inverted vertical style={{  padding: '5em 0em' }}>
      <Container textAlign='center'>
        <List horizontal inverted divided link size='small'>
          <Icon name="facebook" size="big" color="grey"/>
          <Icon name="twitter" size="big" color="grey"/>
          <Icon name="instagram" size="big" color="grey"/>
        </List>
      </Container>
    </Segment>
  </div>
    );
  }

}

export default HomePage;
