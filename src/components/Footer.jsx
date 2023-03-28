import {Box, Center, Text} from '@chakra-ui/react';


export default function Footer()
{
  return(<>
            <Box bgColor="#2874F0">
              <Center py="0.5rem">
                <Text color="white" fontSize="lg" fontWeight="semibold" className="tracking-widest">
                  Made with &nbsp;<span style={{color:"red"}}><i className="bi bi-heart-fill"></i></span>&nbsp; by Shreedhar.
                </Text>
              </Center>
            </Box>
        </>);
}
