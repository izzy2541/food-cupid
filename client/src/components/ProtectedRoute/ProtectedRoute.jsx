import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  
  return (
    <Route {...rest} render={
      props => {
        return user ? <Component user={user} {...rest} {...props} /> : <Redirect to="/login" />
      } 
    }/>
  )
}

export default ProtectedRoute