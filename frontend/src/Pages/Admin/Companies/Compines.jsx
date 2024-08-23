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
    Button,
    Box,
    Flex,
    Stack,
    Input,
    IconButton,
    Image,
    Avatar,
    PopoverTrigger,
    PopoverBody,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Text,
    Spinner
} from '@chakra-ui/react'
import { BsThreeDots } from "react-icons/bs";
import { EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { clearErrors, getALLCompany } from '../../../redux/actions/companyAction';

const Compines = () => {
    const dispatch = useDispatch()
    const { companies, error, loading } = useSelector(state => state.getAllCompany);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getALLCompany());
    }, [error, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (loading) {
        return (

            <Flex w={"100vw"} height={"40vh"} alignItems={"center"} justifyContent={"center"}>
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
                            <Input
                                focusBorderColor='#48bb78'
                                placeholder='search by name'
                                size='md' />
                        </Stack>
                        <Link to={"/admin/company/create"}>
                            <Button
                                bg={"#48bb78"}
                                _hover={{
                                    bg: "#22543d"
                                }}
                            >New Company</Button>
                        </Link>
                    </Flex>
                    <TableContainer>
                        <Table variant="simple">
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr borderBottom="2px solid #3c3c3c">
                                    <Th>Logo</Th>
                                    <Th>Name</Th>
                                    <Th>Date</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    companies && companies?.length > 0 &&
                                    companies.map((company) => {
                                        return (
                                            <>
                                                <Tr borderBottom="1px solid #3c3c3c">
                                                    <Td>
                                                        <Avatar src={companies && company.logoImg} />
                                                    </Td>
                                                    <Td>{companies && company.name}</Td>
                                                    <Td>
                                                        {
                                                            companies &&
                                                            company.createdAt.substring(0, 10)
                                                                .split("-")
                                                                .reverse()
                                                                .join('-')
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
                                                                        <Link
                                                                            to={
                                                                                `/admin/company/${company._id}`
                                                                            }
                                                                        >
                                                                            <Flex alignItems={"center"} gap={2}
                                                                            >
                                                                                <EditIcon />
                                                                                <Text>Edit Company Details</Text>
                                                                            </Flex>
                                                                        </Link>
                                                                    </Box>
                                                                </PopoverBody>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </Td>
                                                </Tr>
                                            </>
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

export default Compines
