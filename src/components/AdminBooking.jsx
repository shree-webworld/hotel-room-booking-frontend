import {useEffect, useState} from "react";
import axios from "axios";
import {  Table, Center, Thead, Tbody, Tfoot,
          Tr, Th, Td, TableCaption, TableContainer
        } from '@chakra-ui/react';
import Loader from "../components/Loader";
import Errors from "../components/Errors";
import {Badge} from "antd";


export default function AdminBooking()
{
  const base_url = import.meta.env.VITE_BASE_URL;
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();

  let fetchAdminBooking = async () =>{

                          try
                          {
                            setLoading(true);
                            let res = await axios.get(`${base_url}/api/bookings/bookroom`);
                            // console.log("fetchAdminBooking - ", res);
                            setBookings(res.data);
                            setLoading(false);

                          }catch (e)
                           {
                             setErrors(true);
                             console.log("AdminBooking errors-",e);
                             setLoading(false);
                           }

                    }

  useEffect(() => {
                    fetchAdminBooking();
                  }, []);


  return(<>

      {loading && <Loader />}

    <TableContainer mt="1rem" rounded="0.5rem" h="25rem" overflowY="auto">
      <Table variant='unstyled' size="md">
        <Thead bgColor="blue.200" style={{position:"sticky", top:"0", zIndex:"2"}}>
          <Tr>
            <Th fontSize="1rem">Booking Id</Th>
            <Th fontSize="1rem">User Id</Th>
            <Th fontSize="1rem">Room</Th>
            <Th fontSize="1rem">From</Th>
            <Th fontSize="1rem">To</Th>
            <Th fontSize="1rem">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          bookings.length &&
          bookings?.map((booking)=>(
                                      <Tr bgColor="orange.100" key={booking._id}>
                                        <Td>
                                            <Badge color="volcano"/>&nbsp;{booking._id}
                                        </Td>
                                        <Td>{booking.userId}</Td>
                                        <Td>{booking.room}</Td>
                                        <Td>{booking.fromDate}</Td>
                                        <Td>{booking.toDate}</Td>
                                        <Td>{booking.status}</Td>
                                      </Tr>
                                  )
                        )
        }
        </Tbody>
      </Table>
    </TableContainer>

      </>);
}
