import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Image,
         Stack, Heading, Text, Button, Container, Tag, Badge } from '@chakra-ui/react';
import {
           List,
           ListItem,
           ListIcon,
           OrderedList,
           UnorderedList,
         } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";



export default function Booking()
{
  let { roomId, fromDate, toDate } = useParams();
  // console.log("roomId ",roomId);
  let userName = sessionStorage.getItem("currentUserName");
  let navigate = useNavigate();

  const toast = useToast();
  const base_url = import.meta.env.VITE_BASE_URL;
  const stripe_key = import.meta.env.VITE_STRIPE_KEY;

  const [roomsById, getRoomsById] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const [totalAmount, setTotalAmount] = useState();

  let firstDate = moment(fromDate , 'DD-MM-YYYY');
  let lastDate = moment(toDate , 'DD-MM-YYYY');
  let totalDays = moment.duration(lastDate.diff(firstDate)).asDays() + 1;




  let onToken = async (token) =>{
                                  // console.log("onToken - ",token);

                        try
                        {
                          let bookingDetails = {
                                                  room: roomsById.roomName,
                                                  roomId : roomsById._id,
                                                  userId : (sessionStorage.getItem('currentUserId')),
                                                  fromDate,
                                                  toDate,
                                                  totalAmount: roomsById.rentPerDay * totalDays,
                                                  totalDays,
                                                  transactionId: token.id

                                               }
                          // console.log("bookingDetails", bookingDetails);
                          const res = await axios.post(`${base_url}/api/bookings/bookroom`, bookingDetails);
                          // console.log("Booking res - ",res);

                          toast({
                                    title: 'Congratulations, payment successfull',
                                    description: "Your room is booked successfully",
                                    status: 'success',
                                    duration: 3000,
                                    variant: 'top-accent',
                                    isClosable: true,
                                    position: 'top'
                                  });
                            navigate("/profile");

                        }catch (e)
                          {
                              console.log("bookingDetails Errors-", e);
                              toast({
                                        title: 'Payment unsuccessfull',
                                        description: "Your room  booking is unsuccessfull! Please, try again.",
                                        status: 'error',
                                        duration: 3000,
                                        variant: 'top-accent',
                                        isClosable: true,
                                        position: 'top'
                                      });

                          }
                      }

  const fetchRoomsById = async () => {
                      try
                      {
                        setLoading(true);
                        const res = await axios.get(`${base_url}/api/rooms/${roomId}`);
                        // console.log("Rooms by id - ",res);
                        getRoomsById(res.data);
                        setLoading(false);
                        // setTotalAmount(totalDays * roomsById.rentPerDay);
                        // console.log("totalAmount", totalAmount);
                      }catch (e)
                        {
                            setErrors(true);
                            console.log("Rooms -",e);
                            setLoading(false);
                        }
  };

  useEffect(() => {
                    if (!userName)
                    {
                      navigate("/login");
                    }
    }, [userName]);

  useEffect(() => {
                    fetchRoomsById();
                  }, []);


  return(<>
    <Navbar />
    {
      roomsById && Object.keys(roomsById).length &&
      (<>

    <Container maxW="100vw" centerContent>

    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      mt="3rem"
      maxW="80vw"
      boxShadow="xl"
    >

    <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '200px' }}
      src={roomsById?.imageurls[0]}
      alt={roomsById.roomName}
      m="0.8rem"
      rounded="md"
    />

      <Stack>
        <CardBody>
          <Badge colorScheme="green" size="md" mb="1rem">
            Booking Details
          </Badge>

          <Heading size='md' mb="1rem">{roomsById.roomName}</Heading>


          <UnorderedList>
            <ListItem>
              <i className="bi bi-person"></i>&nbsp;Name : {sessionStorage.getItem("currentUserName")}
            </ListItem>
            <ListItem>
              <i className="bi bi-calendar2-minus"></i> &nbsp;From Date: {fromDate}
            </ListItem>
            <ListItem>
              <i className="bi bi-calendar2-minus"></i>&nbsp;To Date : {toDate}
            </ListItem>
            <ListItem>Max Count : {roomsById.maxCount}</ListItem>
          </UnorderedList>

          <Badge colorScheme="green" size="md" my="1rem">
            Amount
          </Badge>

          <UnorderedList>
            <ListItem>Total Days : {totalDays}</ListItem>
            <ListItem>Rent Per Day: {roomsById.rentPerDay}</ListItem>
            <ListItem>
                Total Amount : <i className="bi bi-currency-rupee"></i> {roomsById.rentPerDay * totalDays}/-
            </ListItem>
          </UnorderedList>


        </CardBody>

        <CardFooter>
          <StripeCheckout
                  amount={(roomsById.rentPerDay * totalDays) * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey={stripe_key}
          >
            <Button variant='solid' colorScheme='blue'
                    style={{float:"right"}}
            >
              Pay Now
            </Button>
         </StripeCheckout>
        </CardFooter>
      </Stack>
    </Card>

  </Container>

  </>)
  }

        </>);
}
