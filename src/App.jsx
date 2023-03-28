import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box } from '@chakra-ui/react'
import Accommodate from "./pages/Accommodate";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";


function App()
{

  return (<>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/rooms" element={<Accommodate />}/>
                <Route path="/booking/:roomId/:fromDate/:toDate" element={<Booking />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/admin" element={<Admin />}/>

              </Routes>
         </>);

}
export default App
