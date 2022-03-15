// Import react modules
import React, { Fragment } from 'react';

//Import npm packages
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

// Custom Styles
const NavbarBox = styled.div`
  background-color: #212529;
  height: 4rem;
`;

const AuthLayout = props => (
  <Fragment>
    <NavbarBox></NavbarBox>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
      <div className="w-100" style={{ maxWidth: "500px" }}>
        {props.children}
      </div>
    </Container>
  </Fragment>
);

export default AuthLayout