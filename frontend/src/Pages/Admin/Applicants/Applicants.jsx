import React, { useEffect } from 'react'
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
    Heading,
    Spinner,
    Button
} from '@chakra-ui/react'
import { BsThreeDots } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { FcAcceptDatabase } from "react-icons/fc";
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { clearErrors, getAllApplicantOnJob } from '../../../redux/actions/applicationAction';

const Applicants = () => {
    const { colorMode } = useColorMode();
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        loading: applicationLoading,
        error: applicationError,
        applications // not direction application array it job array in it application
    } = useSelector(state => state.application);

    useEffect(() => {
        if (applicationError) {
            toast.error(applicationError);
            dispatch(clearErrors());
        }
        dispatch(getAllApplicantOnJob(id));
    }, [dispatch, applicationError, id]);

    if (applicationLoading) {
        return (

            <Flex w={"100vw"} height={"60vh"} alignItems={"center"} justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>

        )
    }

    return (
        <>
            <Box w={"full"} py={12} minH={"60vh"}>
                <Box w={"80%"} margin={"0 auto"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} mb={12}>
                        <Stack spacing={3}>
                            <Heading size={"md"}>
                                Applicants ({applications && applications.applications?.length})
                            </Heading>
                        </Stack>
                    </Flex>
                    <TableContainer>
                        <Table variant="simple">
                            <TableCaption>A list of Applicant applied on jobs</TableCaption>
                            <Thead>
                                <Tr borderBottom="2px solid #3c3c3c">
                                    <Th>Full Name</Th>
                                    <Th>Email</Th>
                                    <Th>Contact</Th>
                                    <Th>Resume</Th>
                                    <Th>Date</Th>
                                    <Th>Action</Th>
                                    <Th textAlign={"center"}>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    applications && applications.applications?.length > 0 &&
                                    applications.applications?.map((application) => {
                                        return (
                                            <Tr borderBottom="1px solid #3c3c3c">
                                                <Td>
                                                    {applications && application.applicantId?.fullname}
                                                </Td>
                                                <Td>
                                                    {applications && application.applicantId?.email}
                                                </Td>
                                                <Td>
                                                    {
                                                        applications &&
                                                        application.applicantId?.phoneNumber
                                                    }
                                                </Td>
                                                <Td><ChakraLink
                                                    href={
                                                        applications &&
                                                        application.applicantId?.profile?.profilePic
                                                    }
                                                    color={"#48bb78"}
                                                >resume.png</ChakraLink></Td>
                                                <Td>
                                                    {applications &&
                                                        application.applicantId?.createdAt
                                                            .substring(0, 10)
                                                            .split("-")
                                                            .reverse()
                                                            .join("-")
                                                    }
                                                </Td>
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
                                                <Td textAlign={"center"}>
                                                    <Button bg={colorMode === "light"
                                                        ? "#edf2f7" : "#3c3c3c"} color={
                                                            application?.status === "pending" ? "#ff5733" : "#48bb78"
                                                        }
                                                    >
                                                        {applications && application.status}
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default Applicants
