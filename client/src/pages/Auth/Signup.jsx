import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import npm packages
import axios from 'axios';
import { Form, Button, Card, Spinner } from 'react-bootstrap';

// Import custom modules
import AuthLayout from '../../components/Layout/AuthLayout';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const Signup = ( props ) => {
  const { saveUser } = props;

  // STATE MANAGEMENT & INITIAL STATES
  const [state, setState]= useState("IDLE");
  const [user, setUser ] = useState({
    username:'',
    email: '',
    password:''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageVariant, setAlertMessageVariant ] = useState('info');


  //new hook
  const passwordConfirmRef =useRef()

  // DECLARE FORM VARIABLES
  const {username, email, password} = user;
  const history = useHistory();

  // FORM FUNCTIONS
  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("LOADING");

    //early validation- error check first
    if(password !== passwordConfirmRef.current.value){
      setState("ERROR");
      setAlertMessage('Passwords do not match');
      setAlertMessageVariant('danger')
      return;
    }


    try{
      const response = await axios.post(
        '/api/auth/register',
        user
      );
      saveUser(response.data);
      history.push('/dashboard');

    //error
    } catch(err){
      console.log(err.response.data);
      setState("ERROR");
      setAlertMessage(err.response.data);
      setAlertMessageVariant('danger');
    }
  }

  return (
    <AuthLayout>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {/* Error Alert */}
          { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMessageVariant} /> : null }

          <Form onSubmit= { handleSubmit }>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username"
                value={username}
                onChange={ handleTextChange }
                required 
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={email}
                onChange={ handleTextChange }
                required 
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password"
                value={password}
                onChange={ handleTextChange }
                required 
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control 
                type="password" 
                ref = {passwordConfirmRef}
                required 
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit"
              className={state === "LOADING" ? "button-gradient-loading btn-block" : "btn-block"}
              disabled={state === "LOADING"}
            >
              {state === "LOADING" 
                ? <Spinner className="mb-1" as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                : 'Sign Up'
              }
            </Button>
          </Form>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </AuthLayout>
  )
}

export default Signup