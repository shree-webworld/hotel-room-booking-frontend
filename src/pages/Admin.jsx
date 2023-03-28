import Navbar from "../components/Navbar";
import { Space } from 'antd';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container,
          Text, Heading, Center, useToast} from '@chakra-ui/react';
import AdminBooking from "../components/AdminBooking";
import AdminRooms from "../components/AdminRooms";
import AdminUsers from "../components/AdminUsers";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";




export default function Admin()
{

  let userIsAdmin = sessionStorage.getItem("currentUserIsAdmin");
  let navigate = useNavigate();
  const toast = useToast();


  useEffect(() => {
                    if (userIsAdmin === "false")
                    {
                      navigate("/rooms");
                      toast({
                        title: 'Access Denied',
                        description: "Login with admin access user",
                        status: 'error',
                        duration: 4000,
                        position: "top",
                        isClosable: true,
                      });
                    }else if(!userIsAdmin)
                      {
                        navigate("/login");
                      }
    }, [userIsAdmin]);


  return(<>
              <Navbar />

                <Container maxW="85vw" mt="3rem">

                  <Center mb="2rem">
                  <Heading size="lg" bgColor="#1677FF" color="white"
                            px="1rem" py="0.5rem" rounded="lg"
                  >
                      Admin Panel
                  </Heading>
                </Center>

                <Tabs isFitted variant='line' size="lg" colorScheme="blue">
                  <TabList>
                    <Tab>Bookings</Tab>
                    <Tab>Rooms</Tab>
                    <Tab>Users</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <AdminBooking />
                    </TabPanel>
                    <TabPanel>
                      <AdminRooms/>
                    </TabPanel>
                    <TabPanel>
                      <AdminUsers/>
                    </TabPanel>
                  </TabPanels>
                </Tabs>

              </Container>

      </>);
}
