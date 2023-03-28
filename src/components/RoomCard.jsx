import { Card, CardHeader, CardBody, CardFooter, Image,
         Stack, Heading, Text, Button, Center, Flex } from '@chakra-ui/react';
import {
           List,
           ListItem,
           ListIcon,
           OrderedList,
           UnorderedList,
         } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {useState} from "react";
import {
  Modal, useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Carousel, Divider, Tag, Badge } from 'antd';




export default function RoomCard({room, fromDate, toDate})
{
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(<>
    <Container maxW="100vw" centerContent>

    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      my="1.5rem"
      w="65vw"
      boxShadow="xl"
    >
    <Badge.Ribbon text="Free Cancellation" color="green">
      <Image
        objectFit='contain'
        src={room.imageurls[0]}
        alt={room.roomName}
        m="0.8rem"
        rounded="md"
        maxW={{ md: '20vw', sm: '200px' }}
      />
  </Badge.Ribbon>

      <Stack>
        <CardBody>
          <Heading size='md' color="blue.600">
            {room.roomName}
          </Heading>

          <UnorderedList mt="1rem">
            <ListItem>Max Count : {room.maxCount}</ListItem>
            <ListItem>Phone Number : {room.phone}</ListItem>
            <ListItem>Type : {room.type}</ListItem>
          </UnorderedList>


        </CardBody>


        <CardFooter>
          {(fromDate && toDate) && (
          <Button as={Link} to={`/booking/${room._id}/${fromDate}/${toDate}`}
                  variant='solid' colorScheme='blue' mx="1rem">
            Book now
          </Button>
        )}
        <Button variant='outline' colorScheme='blue' onClick={onOpen}>
          View Details
        </Button>
        </CardFooter>

      </Stack>
    </Card>

  </Container>


        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Carousel autoplay>
                    <Image  objectFit='contain' src={room.imageurls[0]} alt='Image 1' rounded="0.5rem"/>
                    <Image  objectFit='contain' src={room.imageurls[1]} alt='Image 2' rounded="0.5rem"/>
                    <Image  objectFit='contain' src={room.imageurls[2]} alt='Image 2' rounded="0.5rem"/>
                </Carousel>

                <Tag color="#108ee9" style={{marginTop:"2rem"}}>
                  Description
                </Tag>

                <Text fontSize="md" py='2' textIndent="2rem">
                  {room.description}
                </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        </>);
}
