import axios from "axios";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
export default function Home({ continents }) {
  return (
    <Flex className="container" direction="column" justify="center" alignItems="center" width="100vw">
      <Flex className="header-container" padding="20px">
        <Text className="header" fontSize="6xl">World continental</Text>
      </Flex>
      <Flex
        className="continent-container"
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        width="100vw"
        padding="10px"
        gap={2}
      >
        {continents.data.continents
          ? continents.data.continents.map((data) => {
            return (
              <Flex direction="column" justify="center" alignItems="center" border='1px' borderColor='GrayText' padding='5px' rounded='20px' gap={2}>
                <Text as='b'>{data.name}</Text>

                <TableContainer>
                  <Table variant="simple">
                    <Thead backgroundColor='yellowgreen'>
                      <Tr>
                        <Th>Emoji</Th>
                        <Th>Country</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.countries.map((country) => {
                        return (
                          <Tr>
                            <Td>{country.emoji}</Td>
                            <Td>{country.name}</Td>
                          </Tr>
                        )
                      })}

                    </Tbody>
                  </Table>
                </TableContainer>

              </Flex>
            );
          })
          : null}
      </Flex>
    </Flex >
  );
}
export async function getStaticProps() {
  const res = await axios.post("https://countries.trevorblades.com/", {
    query: `{
      continents {
        code
        name
        countries {
          code
          name
          capital
          emoji
        }        
      }
    }`,
  });
  const continents = res.data;
  return {
    props: {
      continents,
    },
  };
}
