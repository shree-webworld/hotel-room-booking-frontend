import {useEffect, useState} from "react";
import axios from "axios";
import {  Table, Center, Thead, Tbody, Tfoot,
          Tr, Th, Td, TableCaption, TableContainer
        } from '@chakra-ui/react';
import Loader from "../components/Loader";
import Errors from "../components/Errors";
import {Badge} from "antd";


export default function AdminUsers()
{
  const base_url = import.meta.env.VITE_BASE_URL;
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();

  let fetchAdminUsers = async () =>{

                          try
                          {
                            setLoading(true);
                            let res = await axios.get(`${base_url}/api/register`);
                            // console.log("AdminUsers - ", res);
                            setBookings(res.data);
                            setLoading(false);

                          }catch (e)
                           {
                             setErrors(true);
                             console.log("AdminUsers -",e);
                             setLoading(false);
                           }

                    }

  useEffect(() => {
                    fetchAdminUsers();
                  }, []);


  return(<>
    {loading && <Loader />}


    <TableContainer mt="1rem" rounded="0.5rem" h="25rem" overflowY="auto">
      <Table variant='unstyled' size="md">
        <Thead bgColor="blue.200" style={{position:"sticky", top:"0", zIndex:"2"}}>
          <Tr>
            <Th fontSize="1rem">User Id</Th>
            <Th fontSize="1rem">Name</Th>
            <Th fontSize="1rem">Email</Th>
            <Th fontSize="1rem">Password</Th>
            <Th fontSize="1rem">Is Admin</Th>
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
                                        <Td>{booking.name}</Td>
                                        <Td>{booking.email}</Td>
                                        <Td>{booking.password}</Td>
                                        <Td>{booking.isAdmin ? "YES" : "NO"}</Td>
                                      </Tr>
                                  )
                        )
        }
        </Tbody>
      </Table>
    </TableContainer>

      </>);
}
