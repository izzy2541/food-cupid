// Import React modules
import React from 'react';

// Import npm packages
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

// Import custom components
import Jumbotron from '../components/Jumbotron/Jumbotron';

// Custom styles section [TEMPLATE]
const Styles = styled.div``;

const Home = () => {
  return (
    <Styles>
      {/* 1. Jumbotron Section */}
      <Jumbotron />

      {/* 2. Main Content */}
      <Container fluid className= "mt-5">
        <h2 style={{textAlign:"center"}}>Matching you with the best <br></br>
          food options in your city</h2>
        <p style={{textAlign:"center"}}> <br></br>
Are you tired of trawling the internet trying to figure out where to dine? <br></br>
At FOOD CUPID we have done the hard work for you, narrowing down (what seems like)    <br></br>
the millions of options and bringing you a curated collection of the best. <br></br><br></br>
<Link  className="btn btn-outline-danger btn-sm custom-button-two" to="/restaurants" > Click Me </Link>
    </p>
      </Container>

    </Styles>
  )
}

export default Home