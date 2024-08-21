import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode } from '@chakra-ui/react'
import React from 'react'

const ApplicationJobTable = () => {
    const { colorMode } = useColorMode();
    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr borderBottom="2px solid black">
                            <Th>Header 1</Th>
                            <Th>Header 2</Th>
                            <Th>Header 3</Th>
                            <Th>Header 4</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr borderBottom="1px solid black">
                            <Td>Row 1 Col 1</Td>
                            <Td>Row 1 Col 2</Td>
                            <Td>Row 1 Col 3</Td>
                            <Td><Button bg={colorMode === "light"
                                ? "#ffffff" : "#3c3c3c"}>Selected</Button></Td>
                        </Tr>
                        <Tr borderBottom="1px solid black">
                            <Td>Row 2 Col 1</Td>
                            <Td>Row 2 Col 2</Td>
                            <Td>Row 2 Col 3</Td>
                            <Td><Button bg={colorMode === "light"
                                ? "#ffffff" : "#3c3c3c"}>Selected</Button></Td>
                        </Tr>
                        <Tr borderBottom="1px solid black">
                            <Td>Row 3 Col 1</Td>
                            <Td>Row 3 Col 2</Td>
                            <Td>Row 3 Col 3</Td>
                            <Td><Button bg={colorMode === "light"
                                ? "#ffffff" : "#3c3c3c"}>Selected</Button></Td>
                        </Tr>
                        <Tr borderBottom="1px solid black">
                            <Td>Row 4 Col 2</Td>
                            <Td>Row 4 Col 3</Td>
                            <Td>Row 4 Col 4</Td>
                            <Td><Button bg={colorMode === "light"
                                ? "#ffffff" : "#3c3c3c"}>Selected</Button></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ApplicationJobTable
