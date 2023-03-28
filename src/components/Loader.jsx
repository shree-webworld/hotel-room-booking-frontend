import HashLoader from "react-spinners/HashLoader";
import {useState} from "react";
import {Center } from '@chakra-ui/react'



export default function Loader()
{
    let [loading, setLoading] = useState(true);

  return(<>

    <div className="sweet-loading">
      <Center mt="15rem">
    <HashLoader
            color="blue"
            loading={loading}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      </Center>
      </div>
        </>)
}
