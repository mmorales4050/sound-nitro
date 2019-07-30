import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import './CreateAccountForm.css'

class CreateAccountForm extends Component {
  componentDidMount() {
    document.body.style = 'background: white;';
  }
  componentWillUnmount() {
    document.body.style = 'background: #1f2021;';
  }
  render() {
    return (
      <Grid textAlign='center' verticalAlign='middle' className="login-form">
   <Grid.Column style={{ maxWidth: 450 }}>
     <Header as='h2' color='orange' textAlign='center'>
       <Image src='favicon.ico' /> Create your account
     </Header>
     <Form size='large'>
       <Segment stacked>
         <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
         <Form.Input
           fluid
           icon='lock'
           iconPosition='left'
           placeholder='Password'
           type='password'
         />
         <Form.Input
           fluid
           icon='lock'
           iconPosition='left'
           placeholder='Confirm Password'
           type='password'
         />

         <Button color='orange' fluid size='large'>
           Create Account
         </Button>
       </Segment>
     </Form>
     <Message>
       Already have account? <a href='#'>Login</a>
     </Message>
   </Grid.Column>
  </Grid>
    );
  }

}

export default CreateAccountForm;
