import {useEffect, useState} from "react";
import axios from "axios";
import {  Table, Center, Thead, Tbody, Tfoot,
          Tr, Th, Td, TableCaption, TableContainer
        } from '@chakra-ui/react';
import Loader from "../components/Loader";
import Errors from "../components/Errors";
import {Badge} from "antd";


export default function AdminRooms()
{
  const base_url = import.meta.env.VITE_BASE_URL;
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();

  let fetchAdminRooms = async () =>{

                          try
                          {
                            setLoading(true);
                            let res = await axios.get(`${base_url}/api/rooms/getallrooms`);
                            // console.log("fetchAdminRooms - ", res);
                            setBookings(res.data);
                            setLoading(false);

                          }catch (e)
                           {
                             setErrors(true);
                             console.log("AdminRooms errors -",e);
                             setLoading(false);
                           }

                    }

  useEffect(() => {
                    fetchAdminRooms();
                  }, []);


  return(<>
    {loading && <Loader />}


    <TableContainer mt="1rem" rounded="0.5rem" h="25rem" overflowY="auto">
      <Table variant='unstyled' size="md">
        <Thead bgColor="blue.200" style={{position:"sticky", top:"0", zIndex:"2"}}>
          <Tr>
            <Th fontSize="1rem">Room Id</Th>
            <Th fontSize="1rem">Name</Th>
            <Th fontSize="1rem">Type</Th>
            <Th fontSize="1rem">Rent Per Day</Th>
            <Th fontSize="1rem">Max Count</Th>
            <Th fontSize="1rem">Phone Number</Th>
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
                                        <Td>{booking.roomName}</Td>
                                        <Td>{booking.type}</Td>
                                        <Td>{booking.rentPerDay}</Td>
                                        <Td>{booking.maxCount}</Td>
                                        <Td>{booking.phone}</Td>
                                      </Tr>
                                  )
                        )
        }
        </Tbody>
      </Table>
    </TableContainer>

      </>);
}
