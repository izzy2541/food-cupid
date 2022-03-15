// Import React modules
import React from 'react';

// Import npm packages
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

// Custom styles
const FooterContainer = styled.div`
  background: #FFA6C9;;;
  padding-top: 1rem;
 
  color: white;
  font-size: 14px;
`;

const Footer = () => {
  // Dynamic Date Function
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <FooterContainer>
      <Container>
        <Row className="footer-bottom justify-content-center">
          <p className="pr-5">
            &copy; {getCurrentYear()} FOOD CUPID
          </p>
        </Row>
      </Container>
    </FooterContainer>
  )
}

export default Footer