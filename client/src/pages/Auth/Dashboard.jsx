import React from 'react';
import { Link } from 'react-router-dom';

// Npm modules
import { Card, Button } from 'react-bootstrap';

// Import custom modules
import AuthLayout from '../../components/Layout/AuthLayout';

const Dashboard = (props) => {
  const { user, logout } = props


  return (
    <AuthLayout>
      <Card>
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="mb-4">Profile</h2>
            <h4>Welcome {user ? user.user.username: null }</h4>
          </div>
          <strong>Email: </strong>{user ? user.user.email: null }
          { user && user.user.admin ?
          <p><strong>Secret: </strong> Hello Admin - nice to see you here</p> : null}

          {/* Non-Functional Update Link */}
          <Link to="#" className="btn btn-primary w-100 mt-3">Update Profile</Link>

        </Card.Body>
      </Card>

      {/* Log Out & Forces a Redirect */}
      {<div className="w-100 text-center mt-4">
        <Button variant="link" onClick={() => { logout() }}>Log Out</Button>
      </div>}

    </AuthLayout>
  )
}

export default Dashboard