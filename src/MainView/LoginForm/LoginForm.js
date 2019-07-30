import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './LoginForm.css'
import  {connect} from 'react-redux';

class LoginForm extends Component {

  changePage = (page) => {
    this.props.dispatch({type: "SET_PAGE", payload: page})
  }

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
       <Image src='favicon.ico' /> Log-in to your account
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

         <Button color='orange' fluid size='large' onClick={()=>this.changePage("songs")}>
           Login
         </Button>
       </Segment>
     </Form>
     <Message>
       New to us? <a href='#'>Sign Up</a>
     </Message>
   </Grid.Column>
  </Grid>
    );
  }
}

const mapStateToProps = (store) => ({
  page: store.page
})

export default connect(mapStateToProps)(LoginForm);
