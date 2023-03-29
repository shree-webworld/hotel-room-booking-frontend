import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';



export default function Home()
{
  return (<>
        <Navbar />

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600} color="orange.400"
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Goibibo gets,  <br />
          <Text as={'span'} color={'blue.400'}>
               your desired rooms
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Make your stays wonderful and get your desired rooms immediately with Goibibo.
            Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              as={Link}
              to="/rooms"
              colorScheme={'orange'}
              color="white"
              bgColor='orange.400'
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'orange.500',
              }}>
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Footer />
    </>);

}
