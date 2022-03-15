// Import React modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import npm packages
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { TiArrowBack } from 'react-icons/ti';

// Import custom components
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import Loader from '../../components/Loader/Loader';
import NavBar from '../../components/Header/Header';

// Custom Styles
const Styles = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;

  .image-splash {
    max-height: 300px;
  }
`;



const HeroBox = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  background-color: #343a40;
  color: white;
  border-radius: 1rem 1rem 1rem 1rem;
`;

const H2 = styled.h2`
  font-weight: bold;
`;


const RestaurantDetails = (props) => {
  const { user } = props;
  // Set initial state
  const [state, setState] = useState("IDLE");
  const [data, setData] = useState({
    id: props.match.params.id,
    avgRating: '',
    city: '',
    cuisine: '',
    price: '',
    restaurantName: '',
    restaurantImage: '',
  }); 
  // Dynamic Alert Message States
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageVariant, setAlertMessageVariant ] = useState('info');

  // DECLARE FORM VARIABLES
  const { id, avgRating, city, cuisine, price, restaurantName, restaurantImage } = data;
  const history = useHistory();

  // FORM FUNCTIONS
  // [1] Lifecycle method on load (load API & set new state)
  useEffect(() => {
    setState("INITLOAD");
    async function fetchData() {
      try {
        // Call to API
        const response = await axios.get(`/api/restaurants/${props.match.params.id}`);
        const json = response.data
        console.log(json);

        // Using the spread, we OVERWRITE our default states with the new data!
        // NOTE: We could just do setData({...data, ...json}), but the dependency array then has issues!
        // NOTE: Specifically, we pass a function that has a first param (foodData) same as the current value of the state, and we set it to state we want in the return of the function!
        setData(restaurantData => ({...restaurantData,...json}));

        // Success Message:
        setAlertMessage('Restaurant Item Retrieved Successfully');
        setAlertMessageVariant('success');
        setState("LOADED");

      } catch (err) {
        // Error Message
        console.log(err.response.data);
        setState("ERROR");
        setAlertMessage('There was a problem with the server');
        setAlertMessageVariant('danger');
      }
    }
    fetchData();

    // NOTE on DEPENDENCY ARRAY: Basically, React will RE-RUN this UseEffect, if the value in this array changes.  That's definitely the case for ID but NOT for data, as if it does, it will start and endless loop of re-calls, as our data state changes a lot during the lifecycle & during render phase.
  }, [id, props.match.params.id]);

  // [2] handleDeleteClick
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setState("LOADING");
    try {
      // Call API - must match server route + pass id to route
      const response = await axios.delete(`/api/restaurants/${props.match.params.id}`);
      console.log(response);

      // Success - Redirect:
      setState("SUCCESS");
      history.push('/restaurants');
      
    } catch (err) {
      // Error Message
      console.log(err.response.data);
      setState("ERROR");
      setAlertMessage('There was a problem with the server');
      setAlertMessageVariant('danger');
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
  }

    return (
      <Styles>
        <NavBar/>
        <Container >
          {/* Food Title */}
          <div className="title-header text-center mt-4 mb-4">
            <H2>{restaurantName}</H2>
            
            {/* Success / Error Alert */}
            <div className="mt-3">
              { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMessageVariant} /> : null }
            </div>
          </div>
      
          {/* CONTAINER 1: Title, Description, Image */}
          {user ?
         < HeroBox>
            <Container>
              <Row>
                <Col>
                  <h2>{restaurantName}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit necessitatibus asperiores harum nam quas eum! Ipsa veritatis assumenda consectetur eius laborum iure, expedita vero doloribus aperiam blanditiis tempora. Doloribus quis, iure eaque minima sed facilis aliquam saepe. Vel, neque est.</p>
                </Col>
                <Col>
                  {restaurantImage ? 
                    <img className="image-splash" src={restaurantImage} alt={restaurantName}></img> :
                    <p>No Image Uploaded - Edit the Food Item Here: <a href={`/editrestaurant/${id}`}>{restaurantName}</a></p>
                  }
                </Col>
              </Row>
            </Container>
          </HeroBox>: null}

         
          {/* CONTAINER 3: Admin Buttons*/}
          <HeroBox>
            <Container>
              <Row>
                <Col>
                  <h4>Admin Functions</h4>
                  <p>Please navigate to the desired page to alter {restaurantName} item on the server and database.</p>
                </Col>
              </Row>
              <Row className="mt-4">
                {/* EDIT BUTTON */}
                <Col>
                  <Button className="w-100" href={`/editrestaurant/${id}`} 
                  variant="primary">Edit</Button>
                </Col>

                {/* DELETE BUTTON */}
                <Col>
                  <Button 
                    variant="danger" 
                    className={state === "LOADING" ? "button-gradient-loading btn-block" : "btn-block"}
                    disabled={state === "LOADING"}
                    onClick={ handleDeleteClick }
                  >
                    {state === "LOADING" 
                      ? <Spinner className="mb-1" as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                      : 'Delete'
                    }
                  </Button>
                </Col>
              </Row>
            </Container>
          </HeroBox>

          {/* Back Button */}
          <Row className="justify-content-center mt-4">
            <Link to="/restaurants" className="btn btn-primary mt-4">
              <TiArrowBack />
              {' '}Back to Restaurant List
            </Link>
          </Row>

        </Container>
      </Styles>
    )
  
}

export default RestaurantDetails 