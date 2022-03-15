import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import { shake } from 'react-animations';

// Custom Styles w Animation
const shakeAnimation = keyframes`${shake}`;
const Styles = styled.div`
  .custom-animation {
    animation: 1s ${shakeAnimation};
  }
`;


const ErrorMessage = ({ msg, variant }) => {
  const [show, setShow] = useState(true);

  const animateError = (variant) => {
    if(variant === 'danger') {
      return 'text-center custom-animation';
    } else {
      return 'text-center';
    }
  };
  
  return (
    <Styles>
      { show ? 
        <Alert className={animateError(variant)} variant={variant} onClose={() => setShow(false)} dismissible>
          <h6>{ msg }</h6>
        </Alert> : null
      }
    </Styles>
  )
}

ErrorMessage.propTypes = {
  msg: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
}

export default ErrorMessage