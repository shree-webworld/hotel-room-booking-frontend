import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import { Text, Container, Box, Flex, Spacer, Select } from '@chakra-ui/react'
import Loader from "../components/Loader";
import Errors from "../components/Errors";
import { DatePicker, Space, Input, Modal } from 'antd';
const { RangePicker } = DatePicker;
import moment from "moment";
import { useNavigate } from 'react-router-dom';



export default function Accommodate()
{
  const base_url = import.meta.env.VITE_BASE_URL;
  const [rooms, getRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');
  let userName = sessionStorage.getItem("currentUserName");

  let navigate = useNavigate();


  let [fromDate, setFromDate] = useState();
  let [toDate, setToDate] = useState();

  let filterByDate = (dates) =>{
                                  setFromDate(moment(dates[0].$d).format('DD-MM-YYYY'));
                                  setToDate(moment(dates[1].$d).format('DD-MM-YYYY'));

                                  let tempRooms = [];
                                  let availability = false;
                                  for (let room of duplicateRooms)
                                  {
                                    if (room.currentBookings.length > 0)
                                    {
                                      for (let booking of room.currentBookings)
                                      {
                                        //check for inBetween dates
                                        if(
                                            !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate)
                                              &&
                                            !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(booking.fromDate, booking.toDate)
                                          )
                                        //check for equal to dates
                                       {
                                        if(
                                            moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromDate &&
                                            moment(dates[0].$d).format("DD-MM-YYYY") !== booking.toDate &&
                                            moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromDate &&
                                            moment(dates[1].$d).format("DD-MM-YYYY") !== booking.toDate
                                          )
                                          {
                                            availability = true;
                                          }
                                        }
                                      } //booking for loop end
                                    } //if length >0 ends
                                  if (availability == true || room.currentBookings.length == 0)
                                  {
                                        tempRooms.push(room);
                                  }
                                  getRooms(tempRooms);
                                } //room for loop end
                              }


      let filterBySearch = () =>{
                                  try
                                  {
                                    let tempRooms = duplicateRooms.filter(room => room.roomName.toLowerCase().includes(searchKey.toLowerCase()));
                                    getRooms(tempRooms);

                                  }catch (e)
                                    {
                                        console.log("filterBySearch - ",e);
                                    }
                                }

      let filterByType = (e) =>{
                                 try
                                 {
                                    setType(e);
                                    if(e!=='all')
                                    {
                                      let tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() == e.toLowerCase());
                                      getRooms(tempRooms);
                                    }
                                    else
                                    {
                                      getRooms(duplicateRooms);
                                    }
                                  }catch(error)
                                    {
                                      console.log("filterByType-", error);
                                    }
                                }


  const fetchRooms = async () => {
                      try
                      {
                        setLoading(true);
                        const res = await axios.get(`${base_url}/api/rooms/getallrooms`);
                        // console.log("Rooms - ",res);
                        getRooms(res.data);
                        setDuplicateRooms(res.data);
                        setLoading(false);
                      }catch (e)
                        {
                            setErrors(true);
                            console.log("Rooms errors -",e);
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
                    fetchRooms();
                  }, []);


  return(<>
            <Navbar/>

            <Container centerContent mt="3rem" mb="1rem" border='1px' borderColor='gray.500'
                       boxShadow="lg"  py="1.5rem" rounded="1rem">
              <Flex gap="4">
                <RangePicker format="DD-MM-YYYY" onChange={filterByDate} style={{width:"15rem"}}/>
                <Input type="text" addonBefore={<i className="bi bi-search"></i>}
                       placeholder="Search rooms" style={{width:"15rem"}}
                       value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}}
                       onKeyUp={filterBySearch}
                />
            </Flex>
            <Select mt="1rem" w="15rem" size="sm" rounded="0.4rem" bgColor="white"
                    value={type} onChange={(e) => {filterByType(e.target.value)}}>
                    <option value='all'>All</option>
                    <option value='deluxe'>Deluxe</option>
                    <option value='non-deluxe'>Non-Deluxe</option>
            </Select>

          </Container>

            {
                loading ? (<Loader />) :
                (
                  rooms.map((room)=>(
                                      <RoomCard room={room} key={room._id} fromDate={fromDate} toDate={toDate}/>
                                    )

                         )
                )
            }

        </>);
}
