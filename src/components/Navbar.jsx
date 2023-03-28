import { Flex, Spacer, Box, Heading, Button, ButtonGroup } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';



export default function Navbar()
{
  let user = sessionStorage.getItem('currentUserName');
  let navigate = useNavigate();
  // console.log("user- ",user);

  let logOut = () =>{
                              sessionStorage.clear();
                              navigate("/login");
                          }

  return(<>
    <Flex minWidth='max-content' alignItems='center' gap='2' px="5rem" boxShadow="xl">
      <Box p='2' as={Link} to="/">
        <Heading size='xl'>
            <span style={{color:"#EE6831"}}>go</span>
            <span style={{color:"#2B78DA"}}>ibibo</span>
        </Heading>
      </Box>
      <Spacer />

      {
         user ? (
                   <Menu>
                    <MenuButton as={Button} variant="outline" color="#2B78DA" fontSize="1rem" py="1rem"
                                borderColor="blue.500"
                    >
                      Hi, {user}&nbsp;&nbsp;
                      <i className="bi bi-chevron-down" style={{fontSize:"0.8rem"}}></i>
                    </MenuButton>
                    <MenuList>
                    <Link to="/profile">
                      <MenuItem>
                          Profile
                      </MenuItem>
                    </Link>
                    <MenuItem as={Link} to={`/admin`}>Admin Panel</MenuItem>                                                    
                      <MenuItem onClick={logOut}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ):(
                             <Menu>
                              <MenuButton as={Button} variant="outline" color="#2B78DA" fontSize="1rem" py="1rem"
                                          borderColor="blue.500"
                              >
                                <i className="bi bi-person-circle" style={{fontSize:"1.2rem"}}></i>&nbsp;
                                  Login / Signup &nbsp;&nbsp;
                                <i className="bi bi-chevron-down" style={{fontSize:"0.8rem"}}></i>
                              </MenuButton>
                              <MenuList>
                                <MenuItem as={Link} to={`/login`}>Login</MenuItem>
                                <MenuItem as={Link} to={`/register`}>Register</MenuItem>
                              </MenuList>
                            </Menu>
                        )
        }
    </Flex>
        </>);
}
