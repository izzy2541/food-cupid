// Import React modules
import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import modules
import axios from 'axios'
import { Card, Form, Button, Container, Row, Spinner } from 'react-bootstrap';
import { TiArrowBack } from 'react-icons/ti';

// Import custom modules

import AlertMessage from '../../components/AlertMessage/AlertMessage';

const AddRestaurant = () => {
  // STATE MANAGEMENT & INITIAL STATES
   const [state, setState] = useState("IDLE");
   const [data, setData] = useState({
       avgRating:'',
       city: 'Melbourne',
       cuisine: '',
       price: '',
       restaurantImage: '',
       restaurantName: '',
   })
   //Dynamic File Label
const [fileName, setFileName] = useState('Choose File');

  // Dynamic Alert Message States
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageVariant, setAlertMessageVariant ] = useState('info');

  // DECLARE FORM VARIABLES
 const {avgRating, city, cuisine, price, restaurantImage, restaurantName} = data;
 const history = useHistory();


  // FORM FUNCTIONS
  const handleTextChange = (e) => 
  setData({
    ...data, [e.target.name]: e.target.value
  });

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setData({
          ...data, restaurantImage: file
      });
      setFileName(e.target.files[0].name);
  }


  const handleSubmit = async (e) => {
      e.preventDefault();
      setState('LOADING');
      try{
        const formData = prepareFormData(data);
        const formConfig = {
           headers: {
             'content-type': 'multipart/form-data'
           }
        };

        const response =  await axios.post(
        "/api/restaurants",
        formData,
        formConfig
        );

        console.log(response);
        history.push('/restaurants');

      } catch(err) {
          console.log(err.response.data);
          setState("ERROR");
          setAlertMessage(err.response.data);
          setAlertMessageVariant('danger');
          window.scroll({ top: 420, left: 0, behavior: 'smooth'});

      }
  };

  function prepareFormData(data){
    let formData = new FormData();
    formData.append('avgRating', data.avgRating);
    formData.append('city', data.city);
    formData.append('cuisine', data.cuisine);
    formData.append('price', data.price);
    formData.append('restaurantImage', data.restaurantImage);
    formData.append('restaurantName', data.restaurantName);
    return formData;
  }

  return (

      <Container className="mt-75">
        <div >
          <Card style={{marginTop:"100px"}}>
            <Card.Header className="text-center">
              <strong>ADD NEW RESTAURANT</strong>
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

                {/* 2. Food Category */}
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
                  <Form.Label>cuisine: </Form.Label>
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
                      placeholder='Price'
                      name='price'
                      value = {price}
                      onChange= { handleTextChange }
                    />
                  </Form.Group>

                {/* 6. Food Image */}
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
 
  )
};

export default AddRestaurant