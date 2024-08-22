import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaBuilding } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { MdPinDrop } from 'react-icons/md';
import { clearErrors, createCompany } from '../../../redux/actions/companyAction';


const CreateCompany = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, success, message, error, company } = useSelector((state) => state.newCompany);
    const [comapnyName, setComapnyName] = useState("");
    const [location, setLocation] = useState("");

    const hanleRegisterComapny = async (e) => {
        e.preventDefault();
        if (!comapnyName || !location) {
            toast.error("All filed are required!");
        }
        console.log(comapnyName,location)
        dispatch(createCompany(comapnyName, location));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(message);
            navigate(`/admin/company/${company._id}`);
        }
    }, [error, dispatch, success, navigate])

    return (
        <>
            <Box w={"full"} py={12} minH={"60vh"}>
                <Box w={"80%"} margin={"0 auto"}>
                    <Heading size={"md"}>
                        Your Company Name
                    </Heading>
                    <Text color={"#c5c5c5"} fontSize={"14px"} letterSpacing={1.2}>
                        What would be your company name? you can change it later.
                    </Text>
                    <form onSubmit={hanleRegisterComapny}>
                        <Box mt={4}>
                            <FormControl id="ComapnyName" isRequired>
                                <FormLabel>Comapny Name</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <FaBuilding color='#c5c5c5' />
                                    </InputLeftElement>
                                    <Input type="text"
                                        focusBorderColor='#48bb78'
                                        placeholder='Enter your company name'
                                        onChange={(e) => setComapnyName(e.target.value)}
                                        value={comapnyName}
                                    />
                                </InputGroup>
                            </FormControl>
                        </Box>
                        <Box mt={4}>
                            <FormControl id="location" isRequired>
                                <FormLabel>Comapny location</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <MdPinDrop color='#c5c5c5' />
                                    </InputLeftElement>
                                    <Input type="text"
                                        focusBorderColor='#48bb78'
                                        placeholder='Enter your company location'
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location}
                                    />
                                </InputGroup>
                            </FormControl>
                        </Box>
                        <Stack spacing={4} direction={['column', 'row']} mt={4}>
                            <Link to="/admin/companies">
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.500',
                                    }}>
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                type='submit'
                                loadingText="creating..."
                                isLoading={loading}
                                bg={'#48bb78'}
                                color={'white'}
                                _hover={{
                                    bg: '#22543d',
                                }}>
                                Continue
                            </Button>

                        </Stack>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default CreateCompany
