import axios from "axios";
import {useState, useEffect} from "react";
import Loader from "../components/Loader";
import Errors from "../components/Errors";
import { Card, CardHeader, CardBody, CardFooter, Button, useToast,
          Box, Text, Heading,Stack, StackDivider
        } from '@chakra-ui/react';
import { Tag, Badge} from 'antd';



export default function MyBookings()
{
  let userId = sessionStorage.getItem("currentUserId");
  const base_url = import.meta.env.VITE_BASE_URL;
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const toast = useToast();



  let cancelBooking = async (bookingId, roomId) =>{
                              try
                              {
                                setLoading(true);
                                let res = await axios.post(`${base_url}/api/bookings/cancelBooking`, {bookingId, roomId});
                                // console.log("MyBookings Cancel:", res);
                                setBookings(res.data);
                                setLoading(false);

                                window.location.reload();

                                toast({
                                          title: 'Cancelled successfully',
                                          description: "Your room has been cancelled successfully",
                                          status: 'success',
                                          duration: 3000,
                                          variant: 'top-accent',
                                          isClosable: true,
                                          position: 'top'
                                        });

                              } catch (e)
                               {
                                 setErrors(true);
                                 console.log("MyBookings Cancel:",e);
                                 setLoading(false);
                                 toast({
                                           title: 'Oops !! something went wrong',
                                           description: "Error in booking cancellation, try sometime later",
                                           status: 'error',
                                           duration: 3000,
                                           variant: 'top-accent',
                                           isClosable: true,
                                           position: 'top'
                                         });

                               }
                           }


  let getBookingsByUserId = async () =>{
                        try
                        {
                          setLoading(true);
                          let res = await axios.post(`${base_url}/api/bookings/getbookingsbyuserid`, {userId: userId});
                          // console.log("MyBookings :", res);
                          setBookings(res.data);
                          setLoading(false);
                        } catch (e)
                         {
                            setErrors(true);
                            console.log("MyBookings getBookingsByUserId -",e);
                            setLoading(false);
                         }
  }

  useEffect(() => {
                      getBookingsByUserId();
    }, []);



  return(<>
            {
              loading && <Loader/>

            }
            {
              bookings && bookings.map((booking)=>(
                <Card mt="2rem" boxShadow="outline" key={booking._id}>
                  <Badge.Ribbon text="Booking Details" color="orange">
                  </Badge.Ribbon>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box mt="2rem">
                        <Text pt='2' fontSize='lg' fontWeight="semi-bold" fontStyle="italic"
                              textTransform="capitalize">
                          {booking.room}
                        </Text>
                      </Box>

                      <Box>
                        <Text pt='2' fontSize='sm'>
                          <Badge status="success" />&nbsp; <b>Booking Id :</b> {booking.roomId}
                        </Text>
                      </Box>

                      <Box>
                        <Text pt='2' fontSize='sm'>
                          <Badge status="success" />&nbsp;<b>Transaction Id :</b> {booking.transactionId}
                        </Text>
                      </Box>

                        <Box>
                          <Text pt='2' fontSize='sm'>
                            <Badge status="success" />&nbsp;<b> Check-In :</b> {booking.fromDate}
                          </Text>
                        </Box>

                      <Box>
                        <Text pt='2' fontSize='sm'>
                          <Badge status="success" />&nbsp;<b>Check-Out :</b> {booking.toDate}
                        </Text>
                      </Box>

                      <Box>
                        <Text pt='2' fontSize='sm'>
                          <Badge status="success" />&nbsp;<b> Amount :</b> ₹ {booking.totalAmount}/-
                        </Text>
                      </Box>

                      <Box>
                        <Text pt='2' fontSize='sm'>
                          <Badge status="success" />&nbsp;<b>Status : </b>
                        <Tag color={booking.status == "booked" ? 'green' : 'volcano'}
                             style={{fontSize:"0.9rem", fontWeight:"semi-bold"}}
                        >
                          {booking.status == "booked" ? '✔️Confirmed' : '❌Cancelled'}
                        </Tag>
                      </Text>
                      </Box>

                    </Stack>
                  </CardBody>

                  <CardFooter>
                  {
                    booking.status !=="cancelled" && (
                      <Button variant='solid' onClick={()=>{cancelBooking(booking._id, booking.roomId)}}
                              colorScheme='red'
                      >
                          Cancel Booking
                      </Button>
                    )
                  }
                  </CardFooter>
                </Card>

                                                  )

                                      )
            }

        </>);
}
