import { Card, CardHeader, CardBody, CardFooter,
          Box, Text, Heading,Stack, StackDivider
        } from '@chakra-ui/react';
import { Badge } from 'antd';

export default function ProfileCard({userName, userEmail, userIsAdmin})
{
  return(<>
    <Card boxShadow="outline">
      <Badge.Ribbon text="Profile Details" color="orange">
    </Badge.Ribbon>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge status="success" />&nbsp;Name :
            </Heading>
            <Text pt='2' fontSize='sm' textTransform="capitalize">
              {userName}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge status="success" />&nbsp;Email :
            </Heading>
            <Text pt='2' fontSize='sm'>
              {userEmail}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge status="success" />&nbsp;Admin Access :
            </Heading>
            <Text pt='2' fontSize='sm'>
              {userIsAdmin == "false" ? "No" : "Yes"}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>

        </>);
}
