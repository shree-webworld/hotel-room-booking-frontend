import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center
} from '@chakra-ui/react';


export default function Errors()
{

  return(<>

    <Center>
    <Alert status='error' mt="5rem" w="80vw">
      <AlertIcon />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription>Please try again later.</AlertDescription>
    </Alert>
    </Center>

        </>);
}
