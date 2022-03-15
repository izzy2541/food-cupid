// Import React modules
import React, { useState, useEffect } from 'react';

// Import npm packages
import { Container, Row, Col, Card, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import AlertMessage from '../../components/AlertMessage/AlertMessage';


//import custom modules
import Header from '../../components/Header/Header';



// Custom Styles
const Styles = styled.div`
  
 
 // background-color: #F2ACB9;;

  .title-header {
    margin-top: 0rem;
    //margin-bottom: 4rem;
    text-align: center;
  }



  .card-box {
    margin-bottom: 1rem;
    background-color: rgba(255,255,255,.6);
    color: #212529;
  }

  .card-image {
    margin: 3px;
    border: solid 2px black;
  }
`;





const RestaurantList = () => {
  // Set initial state
  const [state, setState] = useState("IDLE");
  const [data, setData] = useState([]); 
   
  const [colorChange, setColorChange] = useState(false);

  // Function: Change navbar transparency based on scroll height
  const changeNavbarColor = () => {
    if (window.scrollY > 20) {
      setColorChange(false);
    } else {
      setColorChange(true);
    }
  }

  window.addEventListener('scroll', changeNavbarColor);


  //dynamic alert state
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageVariant, setAlertMessageVariant] = useState('');
  
 
  // Lifecycle method on load (load API & set new state)
  useEffect(() => {
    setState("INITLOAD");
    async function fetchData() {
      try {
        const response = await axios.get('/api/restaurants');
        console.log(response.data);
        setData(response.data);

        // Success Message:
        setAlertMessage('Food Retrieved Successfully');
        setAlertMessageVariant('success');
        setState("LOADED");
   
      } catch (error) {
        setState("ERROR");
        setAlertMessage('There was a problem with the server');
        setAlertMessageVariant('danger');
      }
    }
    fetchData();
  }, []);

  if(state === "INITLOAD"){
    return(
      <Container className="text-center" style={{marginTop: "10rem"}}>
        <Loader />
      </Container>
    )
  } else {
    return(
    <Styles>
      <Container style={{marginTop: "4rem"}}>
      <Navbar bg={colorChange ? "transparent" : "danger" } variant="danger" fixed="top"> </Navbar>       

        <div className="title-header">
          <h2 style={{color:'red'}}>Restaurants</h2>
        </div>

        <Row>
            <Col md={{ span: 4, offset: 4 }}>
              {/* Success / Error Alert */}
              { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMessageVariant} /> : null }

        {/*ADD restaurant section*/}
     
        </Col>
        </Row>
        <Row xs={1} lg={4} className="justify-content-center mt-5">
          {data.map(restaurants => (
             <Col key={restaurants.id}>
              <Card className="card-box mx-auto" border="light" style={{ width:'14rem'}}>
                <Card.Img className="card-image" variant="top" style={{height:"155px", marginTop: ''}} src={restaurants.restaurantImage} />
                <Card.Body className="text-center">
                  <Link to={`/restaurants/${restaurants.id}`} style={{ color:'black'}}>{restaurants.restaurantName} </Link>
                </Card.Body> 
              </Card> 
            </Col>
          ))}

        </Row> 
        <Row>
            <Col md={{ span: 2, offset: 5 }}>
    
              <div className="text-center mt-4 mb-4">
                <Button className="btn-block" href="/addrestaurant" variant="danger">Add Restaurant</Button>
              </div>
            </Col>
          </Row>
      </Container>
    </Styles>
  )
}
}
export default RestaurantList