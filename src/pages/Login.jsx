import Navbar from "../components/Navbar";
import { Box, Container, Input, Button, Image, Center, Text, useToast } from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, InputLeftElement,
          InputLeftAddon} from '@chakra-ui/react';
import {useState, useEffect} from "react";
import axios from "axios";





export default function Login()
{

  const base_url = import.meta.env.VITE_BASE_URL;
  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();
  let [showPassword, setShowPassword] = useState(false);
  let handlePasswordIcon = () => setShowPassword(!showPassword) ;
  const toast = useToast();
  const navigate = useNavigate();


  useEffect( ()=>{
                    setFocus("email");
                  },[])


  let onSubmit = async (signinData) =>{
                      try
                      {
                        let {email, password} = signinData;
                        // console.log(email, password);
                        let result = await axios.post(`${base_url}/api/login`, {email, password});
                        // console.log("Login-",result);

                        sessionStorage.setItem('currentUserName', `${result.data.name}`);
                        sessionStorage.setItem('currentUserId', `${result.data._id}`);
                        sessionStorage.setItem('currentUserEmail', `${result.data.email}`);
                        sessionStorage.setItem('currentUserIsAdmin', `${result.data.isAdmin}`);

                        reset();
                        navigate("/rooms");

                        toast({
                          title: 'Signin successfull',
                          description: "Accommodate Rooms",
                          status: 'success',
                          duration: 4000,
                          position: "top",
                          isClosable: true,
                        });

                      }catch (e)
                       {
                         console.log(e);
                         toast({
                           title: 'Invalid Credentials',
                           description: "Signin again!!",
                           status: 'error',
                           duration: 4000,
                           position: "top",
                           isClosable: true,
                         });


                       }
                          }



  return(<>
            <Navbar />

              <Container centerContent bg="gray.100" maxW='md' my="5rem" rounded="1rem"
                         style={{fontFamily: "'Inter', sans-serif"}}
              >
                  <Center>

                  </Center>


                  <Box my="2rem" px="5rem">
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isRequired isInvalid={errors.email}>
                      <FormLabel fontSize="sm" ml="0.5rem" htmlFor="email">
                        Email :
                      </FormLabel>

                      <Input type="email" id="email" name="email" placeholder='Enter email'
                              variant='outline'
                              {...register("email",{
                                                      required: true,
                                                      pattern: {
                                                                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                  message: "Email must be valid",
                                                               },
                                                   }
                                          )
                              }
                              autoComplete="off"  focusBorderColor='blue.500' w="23rem" size="md"/>
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired mt="1.5rem" isInvalid={errors.password}>
                      <FormLabel fontSize="sm" ml="0.5rem" htmlFor="password">
                        Password :
                      </FormLabel>

                      <InputGroup w="23rem">
                       <Input placeholder="Enter password" id="password" variant='outline' focusBorderColor='blue.500'
                               type={showPassword ? 'text' : 'password'}
                               name="password" {...register("password",{
                                                                          required: "Password is required...",
                                                                       }
                                                            )
                                               }
                               autoComplete="off" size="md"
                        />
                        <InputRightElement>
                            <Button  size='sm' onClick={handlePasswordIcon} bg="white" color="blue.500">
                               {showPassword ? <i className="bi bi-eye-slash-fill"></i>  : <i className="bi bi-eye-fill"></i> }
                            </Button>
                         </InputRightElement>
                       </InputGroup>
                       <FormErrorMessage>
                         {errors.password?.message}
                       </FormErrorMessage>
                  </FormControl>

                  <Button type="submit" bg="blue.600" color="white" px="10rem" my="2rem"
                          fontSize="lg" borderRadius='lg' _hover={{bg:"blue.300"}}
                  >
                    Login
                  </Button>
                </form>


                      <Text color="gray.500"  fontSize="1rem" textAlign="center" mb="1rem">
                        OR
                      </Text>

                    <Center color="blue.700">
                     <Link  to="/register">
                      Create an account
                    </Link>
                  </Center>
                </Box>
              </Container>

        </>);
}
