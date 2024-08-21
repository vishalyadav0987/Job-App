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
    Button,
    Box,
    Flex,
    Stack,
    Input,
    IconButton,
    PopoverTrigger,
    PopoverBody,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Text,
    Divider
} from '@chakra-ui/react'
import { BsEye, BsThreeDots } from "react-icons/bs";
import { EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Jobs = () => {
    const { colorMode } = useColorMode()
    return (
        <>
            <Box w={"full"} py={12} minH={"60vh"}>
                <Box w={"80%"} margin={"0 auto"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} mb={12}>
                        <Stack spacing={3}>
                            <Input
                                focusBorderColor='#48bb78'
                                placeholder='search by company name & role'
                                size='md' width={"400px"} />
                        </Stack>
                        <Link to={"/admin/job/create"}>
                            <Button
                                bg={"#48bb78"}
                                _hover={{
                                    bg: "#22543d"
                                }}
                            >New Job</Button>
                        </Link>
                    </Flex>
                    <TableContainer>
                        <Table variant="simple">
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr borderBottom="2px solid #3c3c3c">
                                    <Th>Company Name</Th>
                                    <Th>Role</Th>
                                    <Th>Date</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr borderBottom="1px solid #3c3c3c">
                                    <Td>Google</Td>
                                    <Td>
                                       Full Stack Developer 
                                    </Td>
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
                                                        <Link to={`/admin/job/1`}>
                                                            <Flex alignItems={"center"} gap={2}>
                                                                <EditIcon />
                                                                <Text>Edit Job Details</Text>
                                                            </Flex>
                                                        </Link>
                                                        <Divider mb={2} mt={2}></Divider>
                                                        <Link to={`/admin/job/1/applicants`}>
                                                            <Flex alignItems={"center"} gap={2}>
                                                                <BsEye />
                                                                <Text>Applicants</Text>
                                                            </Flex>
                                                        </Link>
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

export default Jobs
