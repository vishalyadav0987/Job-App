import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaBuilding } from "react-icons/fa";
import { Link } from 'react-router-dom';

const CreateCompany = () => {
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
                    <form>
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
                                    />
                                </InputGroup>
                            </FormControl>
                        </Box>
                        <Stack spacing={4} direction={['column', 'row']} mt={4}>
                            <Link to="/admin/companies">
                                <Button
                                type='submit'
                                    bg={'red.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.500',
                                    }}>
                                    Cancel
                                </Button>
                            </Link>
                            <Link to={`/admin/company/1`}>
                                <Button
                                    bg={'#48bb78'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#22543d',
                                    }}>
                                    Continue
                                </Button>
                            </Link>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default CreateCompany
