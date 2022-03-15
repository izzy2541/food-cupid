import React from 'react'

// Import packages
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { TiWarning } from "react-icons/ti";

//Custom styles
const H2 = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  padding-bottom: 1rem;
  color: red;
  text-align: center;
`;

const H3 = styled.h3`
  font-size: 1.1rem;
  color: var(--mainDark);
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 8rem;
`;

const NavbarBox = styled.div`
  background-color: #212529;
  height: 4.3rem;
`;

const Styles = styled.div`
  .container {
    padding-bottom: 1rem;
    margin-top: 2rem;
  }

  .icon-override {
    padding-bottom: 0.1rem;
    margin-bottom: 0.3rem;
  }
`;

const NotFound = () => {
  return (
    <Styles>
      <NavbarBox></NavbarBox>
      <Container id="main">
        <H2><TiWarning className="icon-override"/>{' '}PAGE NOT FOUND</H2>
        <H3>It seems that you made an error somewhere</H3>
        <ButtonContainer >
          <a className="btn btn-dark mr-2" href="/">Return Home</a>
        </ButtonContainer>
      </Container>
    </Styles>
  )
}

export default NotFound