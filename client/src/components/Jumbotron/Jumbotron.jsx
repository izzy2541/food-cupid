// Import React modules
import React from 'react';

// Import npm packages

import styled from 'styled-components';

// Import assets
import splashHome from '../../assets/jumbotronImageCropped.jpg';

// Create a new Custom styles section
const Styles = styled.div`
  /* General styling */
  background: url(${splashHome}) no-repeat;

  /* NEW: As Jumbotron is no longer in Bootstrap 5.0, should get into the habit of coding in Jumbo style frames with CSS */
  padding: 2rem 1rem;
  background-color: #FFFFFF;


  /* This sets the image to "cover", to stretch to the width of viewport, so cannot move it left or right, only up or down */
  background-size: cover;
  color: #FFFFFF;
  height: 800px;
  margin-bottom: 1rem;

  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* OVERLAY SETUP: z-index allows one to stack elements on top of each other - the z-index indicates the "layer level" */
  z-index: 0;  
  scale: 1rem;




  /* This allows movement of the text & button in the Jumbotron */
  .text-box {
    margin-left: 1rem;
    margin-top: 5rem;
    padding-top: 50px;
    text-align: center;
  }
`;

const Jumbotron = () => {
  return (
    <Styles>
      <div className='overlay'></div>
        <div className="text-box">
        <h1>FOOD</h1>
        <h1>CUPID</h1>

        </div>
    </Styles>
  )
}

export default Jumbotron