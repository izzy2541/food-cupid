// Import React modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import modules
import axios from 'axios';
import styled from 'styled-components';
import { Card, Form, Button, Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import { TiArrowBack } from 'react-icons/ti';

// Import custom modules
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import Loader from '../../components/Loader/Loader';
import { prepareFormData, getFilePathFromUrl } from '../../utilities/writeServices';

// Custom Styles
const Styles = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;


  .image-preview {
    max-height: 200px;
  }
`;

const EditRestaurant = ( props ) => {
  // STATE MANAGEMENT & INITIAL STATES
  const [state, setState] = useState("IDLE");
  const [data, setData] = useState ({
    id: props.match.params.id,
    avgRating: '1',
    city: 'Melbourne',
    cuisine: '',
    price: '',
    restaurantName: '',
    restaurantImage: '',
  });

  
  // File Path of Existing downloadURL (for potential deletion)
  const [filePath, setFilePath] = useState('');
  // Dynamic File Label
  const [fileName, setFileName] = useState('Choose File');
  // Dynamic Alert Message States
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageVariant, setAlertMessageVariant ] = useState('info');

  // DECLARE FORM VARIABLES
  const { id, avgRating, city, cuisine, price, restaurantName, restaurantImage } = data;
  const history = useHistory();

  // FORM FUNCTIONS
  // [1] Lifecycle method on load (load API & set new state for pre-population of fields)
  useEffect(() => {
    setState("INITLOAD");
    async function fetchData() {
      try {
        // Call to API
        const response = await axios.get(`/api/restaurants/${id}`);
        const json = response.data
        console.log(json);

        // Using the spread, we OVERWRITE our default states with the new data!
        setData(restaurantData => ({...restaurantData,...json}));

        // Set file name value to foodImage stem
        if (!json.restaurantImage) {      
          console.log('No downloadURL provided by DB'); 
          setFileName('Choose File');
        } else {
          const existingFileName = getFilePathFromUrl(json.restaurantImage);
          console.log(existingFileName);
          setFileName(existingFileName);
          setFilePath(existingFileName);
        }

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
  }, [id]);

  const handleTextChange = (e) => 
  setData({
    ...data, [e.target.name]: e.target.value
  });
  
  // [3] handleFileChange will handle change in state for the file upload
  const handleFileChange = (e) => {
    setState("FILECHANGE");
    const file = e.target.files[0];
    setData({
      ...data, restaurantImage: file
    });
    setFileName(e.target.files[0].name);
  }

  // [4] handleSubmit will control button event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("LOADING")
    try {
      const formData = prepareFormData(data, filePath);
      const formConfig = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      const response = await axios.put(
        `/api/restaurants/${id}`, 
        formData, 
        formConfig
      );
      console.log(response)
      history.push('/restaurants');
    } catch (err) {
      console.log(err.response.data);
      setState("ERROR");
      setAlertMessage(err.response.data);
      setAlertMessageVariant('danger');
      window.scroll({top: 420, left: 0, behavior: 'smooth' });
    }
  };

  
  if(state === "INITLOAD"){
    return (
      <Container className="text-center" style={{marginTop: "10rem"}}>
        <Loader />
      </Container>
    )
  } else {
    return (
      <Styles>

        {/* 2. Add Restaurant Section */}
        <Container>
          <div className="mt-5">
            <Card>
              <Card.Header className="text-center">
                <strong>EDIT RESTAURANT</strong>
              </Card.Header>
              <Card.Body>
  
                {/* Error Alert */}
              {alertMessage ? <AlertMessage msg={alertMessage} variant={alertMessageVariant}/> : null}
  
  
                <Form onSubmit= { handleSubmit }>
                  {/* 1. Food Name */}
                  <Form.Group controlId="restaurantName">
                    <Form.Label>Restaurant Name: </Form.Label>
                    <Form.Control 
                      type='text'
                      placeholder='Enter Restaurant Name'
                      name='restaurantName'
                      value = {restaurantName}
                      minLength='2'
                      onChange= { handleTextChange }
                    />
                  </Form.Group>
  
                  {/* 2. Restaurant Category */}
                  <Form.Group controlId="city">
                    <Form.Label>City: </Form.Label>
                    <Form.Control 
                      as='select'
                      name='city'
                      value = {city}
                      onChange= { handleTextChange }
                      custom
                    >
                      <option value="Melbourne" >Melbourne</option>
                      <option value="Sydney">Sydney</option>
                      <option value="Brisbane">Brisbane</option>
                      <option value="Adelaide">Adelaide</option>
                      <option value= "Perth">Perth</option>
                      <option value= "Tasmania">Tasmania</option>
                      <option value="Darwin">Darwin</option>
                    </Form.Control>
                  </Form.Group>
  
                  {/* 3. cuisine */}
                  <Form.Group controlId="cuisine">
                    <Form.Label>Cuisine: </Form.Label>
                    <Form.Control 
                      type='string'
                      placeholder='cuisine'
                      name='cuisine'
                      value = {cuisine}
                      onChange= { handleTextChange }
                    />
                  </Form.Group>
        
                  <Form.Group controlId="avgRating">
                    <Form.Label> Rating</Form.Label>
                    <Form.Control 
                      type='number'
                      min='1'
                      max='10'
                      placeholder='Rating'
                      name='avgRating'
                      value = {avgRating}
                      onChange= { handleTextChange }
                    />
                  </Form.Group>

                   
          
  
                    <Form.Group controlId="price">
                      <Form.Label> Average price per person</Form.Label>
                      <Form.Control 
                        type='number'
                        placeholder='Average price per person'
                        name='price'
                        value = {price}
                        onChange= { handleTextChange }
                      />
                    </Form.Group>
  
                  {/* 6. Restaurant Image */}
                  <Form.Label>Restaurant Image:</Form.Label>
                  <Form.Group controlId="restaurantImage">
                    <Form.File 
                      id="customFile"
                      type="file"
                      label={fileName}
                      className="mb-4"
                      onChange= { handleFileChange }
                      custom
                    />
                  </Form.Group>

                    {/* 6b. CONDITIONAL Preview Image of File from DB */}
                    { restaurantImage && state === "LOADED" ? 

                <div className="text-center mt-2 mb-5">
              <h6>Current Image:</h6>
              <Image className="image-preview" src={restaurantImage} rounded />
            </div>

                : null 
            }
  
                  {/* 7. Submit Button */}
                  <div>
                  <Button 
                      variant="primary" 
                      type="submit"
                      className={state === "LOADING" ? "button-gradient-loading btn-block" : "btn-block"}
                      disabled={state === "LOADING"}
                    >
                      {state === "LOADING" 
                        ? <Spinner className="mb-1" as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                        : 'Submit'
                      }
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
  
          {/* Back Button */}
          <Row className="justify-content-center mt-4">
            <Link to="/restaurants" className="btn btn-primary mt-4">
              <TiArrowBack />
              {' '}Back to Restaurants
            </Link>
          </Row>
        </Container>
      </Styles>
    )
                    }
  };
  
  export default EditRestaurant