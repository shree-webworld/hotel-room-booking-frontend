import { Tabs, TabList, TabPanels, Tab, TabPanel, Container,
          Text} from '@chakra-ui/react';
import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import ProfileCard from "../components/ProfileCard";
import MyBookings from "../components/MyBookings";

export default function Profile()
{
  let userName = sessionStorage.getItem("currentUserName");
  let userEmail = sessionStorage.getItem("currentUserEmail");
  let userIsAdmin = sessionStorage.getItem("currentUserIsAdmin");



  let navigate = useNavigate();



  useEffect(() => {
                    if (!userName)
                    {
                      // window.location.href = "/login";
                      navigate("/login");
                    }
    }, [userName]);




  return(<>
            <Navbar />


            <Container mt="5rem" bgColor="gray.100" px="5rem" py="2rem">
            <Tabs isFitted variant='line' size="lg" colorScheme="blue">
              <TabList>
                <Tab>Profile</Tab>
                <Tab>Bookings</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ProfileCard userName={userName} userEmail={userEmail} userIsAdmin={userIsAdmin}/>
                </TabPanel>
                <TabPanel>
                  <MyBookings/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>

        </>);
}
