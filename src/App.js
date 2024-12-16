import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavBar from "./components/AppNavBar";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AdminDashboard from "./pages/AdminDashboard";
import Movies from "./pages/Movies";
import GetMovie from "./components/GetMovie";

import { UserProvider } from './context/UserContext';
import {useState, useEffect} from 'react';

import { Container } from 'react-bootstrap';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  function unsetUser(){
    localStorage.clear();
  }

  useEffect(()=> {
    //fetch to retrieve the user details
  
  if(localStorage.getItem('token')){
      fetch('https://movieapp-api-lms1.onrender.com/users/details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(data => {
          // console.log(data.user._id);

          if(data.user._id === undefined){
            setUser({
              id:null,
              isAdmin: null
            })
          }else{
            setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin
            })
          }
      })

  }else{
    setUser({
      id: null,
      isAdmin: null
    })
    
  }

}, [])


  return(
    <>
      <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavBar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/getMovie/:id" element={<GetMovie />} />
              
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  )
}

export default App;
