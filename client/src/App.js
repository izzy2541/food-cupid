// Import React modules
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import styles
import './App.css';

// Import pages 
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Auth/Dashboard'
import RestaurantList from './pages/Restaurants/RestaurantList';
import AddRestaurant from './pages/Restaurants/AddRestaurant';
import EditRestaurant from './pages/Restaurants/EditRestaurant';
import RestaurantDetails from './pages/Restaurants/RestaurantDetails';
import NotFound from './pages/NotFound';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


// Import components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout/Layout';

function App() {
  const [user, setUser]= useState(null);
   
  useEffect(() => {
    let savedData = localStorage.getItem("user");
    savedData = JSON.parse(savedData);
    setUser(savedData);
  },[])

  const onSaveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user);
  }

  const onLogout = (user) =>{
    localStorage.removeItem("user");
    setUser(null);
}

  return (
    <Fragment>
      {/* Flexbox Application */}
      <div className="app">
      <Router>
      <Header user={user} logout={onLogout} />
        <Layout>
            <Switch>
              <Route exact path='/' component={Home}></Route> 
              <Route exact path='/signup' render={(props) => <Signup saveUser={onSaveUser} {...props} />}></Route>
                <Route exact path='/login' render={(props) => <Login saveUser={onSaveUser} {...props} />}></Route>
                <ProtectedRoute exact path='/dashboard' user={user} logout={onLogout} component={Dashboard}></ProtectedRoute>         
              <Route exact path='/about' component={About}></Route>   
              <Route exact path='/restaurants' component={RestaurantList}></Route>  
              <Route exact path='/restaurants/:id' component={RestaurantDetails}></Route>  
              <Route exact path='/addrestaurant' component={AddRestaurant}></Route>  
              <Route exact path='/editrestaurant/:id' render={(props) => <EditRestaurant user={user} {...props} />}></Route>
              <Route component={EditRestaurant}></Route>   
              <Route component={NotFound}></Route>
            </Switch>
        </Layout>
      
      <Footer />
      </Router>
      </div>
    </Fragment>
  );
}

export default App;