import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import npm packages
import axios from 'axios';
import { Form, Button, Card, Spinner } from 'react-bootstrap';

// Import custom modules
import AuthLayout from '../../components/Layout/AuthLayout';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const Login = (props) => {
  const { saveUser } = props;
  // STATE MANAGEMENT & INITIAL STATES
  const [state, setState] = useState("IDLE");
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageVariant, setAlertMessageVariant ] = useState('info');

  // DECLARE FORM VARIABLES
  const { email, password } = user;
  const history = useHistory();

  
   // FORM FUNCTIONS
   const handleTextChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("LOADING");
    try {
      const response = await axios.post(
        '/api/auth/login',
        user
      );
      saveUser(response.data);
      history.push('/dashboard');

    } catch(err) {
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
          <h2 className="text-center mb-4">Log in</h2>

          {/* Error Alert */}
          { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMessageVariant} /> : null }

          <Form onSubmit= { handleSubmit } >
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
            <Button 
              variant="primary" 
              type="submit"
              className={state === "LOADING" ? "button-gradient-loading btn-block" : "btn-block"}
              disabled={state === "LOADING"}
            >
              {state === "LOADING" 
                ? <Spinner className="mb-1" as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                : 'Log In'
              }
            </Button>
          </Form>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Not a member? <Link to="/signup">Sign Up</Link>
      </div>
    </AuthLayout>
  )
}

export default Login