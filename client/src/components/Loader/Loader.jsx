import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

// Custom Styles
const Styles = styled.div`
  .custom-spinner{
    height: 150px;
    width: 150px;
  }
`;

const Loader = () => {
  return (
    <Styles>
      <Spinner className="custom-spinner" animation="border" variant="danger" size="lg" >
        <span className="sr-only">LOADING...</span>
      </Spinner>
    </Styles>
  )
}

export default Loader