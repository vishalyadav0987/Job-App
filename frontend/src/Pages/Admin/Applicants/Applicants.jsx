import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useColorMode,
    Box,
    Flex,
    Stack,
    IconButton,
    PopoverTrigger,
    PopoverBody,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Text,
    Divider,
    Link as ChakraLink,
    Heading
} from '@chakra-ui/react'
import {  BsThreeDots } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { FcAcceptDatabase } from "react-icons/fc";

const Applicants = () => {
    const { colorMode } = useColorMode()
    return (
        <>
            <Box w={"full"} py={12} minH={"60vh"}>
                <Box w={"80%"} margin={"0 auto"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} mb={12}>
                        <Stack spacing={3}>
                            <Heading size={"md"}>Applicants (1)</Heading>
                        </Stack>
                    </Flex>
                    <TableContainer>
                        <Table variant="simple">
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr borderBottom="2px solid #3c3c3c">
                                    <Th>Full Name</Th>
                                    <Th>Email</Th>
                                    <Th>Contact</Th>
                                    <Th>Resume</Th>
                                    <Th>Date</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr borderBottom="1px solid #3c3c3c">
                                    <Td>Vishal Yadav</Td>
                                    <Td>Vishalyadav@gmail.com</Td>
                                    <Td>9667225460</Td>
                                    <Td><ChakraLink href='resume.png'
                                        color={"#48bb78"}
                                    >resume.png</ChakraLink></Td>
                                    <Td>24-08-25</Td>
                                    <Td>
                                        <Popover>
                                            <PopoverTrigger>
                                                <IconButton
                                                    icon={<BsThreeDots />}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverBody>
                                                    <Box>

                                                        <Flex alignItems={"center"} gap={2} 
                                                        cursor={"pointer"}>
                                                            <FcAcceptDatabase />
                                                            <Text>Accepted</Text>
                                                        </Flex>

                                                        <Divider mb={2} mt={2}></Divider>

                                                        <Flex alignItems={"center"} gap={2}
                                                         cursor={"pointer"}>
                                                            <FcCancel />
                                                            <Text>Rejected</Text>
                                                        </Flex>

                                                    </Box>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </Td>
                                </Tr>

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default Applicants
