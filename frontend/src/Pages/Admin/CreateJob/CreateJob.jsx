import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, Stack, useColorModeValue, Text, InputLeftElement, Select } from '@chakra-ui/react'
import { FaBuilding } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";

const CreateJob = () => {
    return (
        <>
            <Flex align={'center'} justify={'center'}>
                <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'2xl'} textAlign={'center'}>
                            Create Job
                        </Heading>
                    </Stack>
                    <form>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.900')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                <Box>
                                    <FormControl id="companyName" isRequired>
                                        <FormLabel>Job Name</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <FaBuilding color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="jobname"
                                                placeholder='Enter job name'
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="Description" isRequired>
                                        <FormLabel>Description</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <MdEditNote color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="type"
                                                name="description"
                                                placeholder='description'
                                            />
                                        </InputGroup>

                                    </FormControl>
                                </Box>
                                <HStack>
                                    <FormControl id="website" isRequired>
                                        <FormLabel>No of Position</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <IoIosLink color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="number"
                                                name="postion"
                                                placeholder='No of postion'
                                            />
                                        </InputGroup>

                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Location</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <MdLocationPin color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type='text'
                                                name="location"
                                                placeholder='company location'
                                            />
                                        </InputGroup>

                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl id="website" isRequired>
                                        <FormLabel>Requirements</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <IoIosLink color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="requirements"
                                                placeholder='requirements'
                                            />
                                        </InputGroup>

                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel display={"flex"}
                                            alignItems={"center"}
                                            gap={2}
                                        >Salary <Text fontSize={"12px"} color={"#c5c5c5"}>(in LPA)</Text></FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <MdLocationPin color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type='text'
                                                name="Salary in LPA"
                                                placeholder='Salary in LPA'
                                            />
                                        </InputGroup>

                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl id="website" isRequired>
                                        <FormLabel display={"flex"}
                                            alignItems={"center"}
                                            gap={2}
                                        >Experience<Text fontSize={"12px"} color={"#c5c5c5"}>(in years)</Text></FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <IoIosLink color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="Experience"
                                                placeholder='Experience'
                                            />
                                        </InputGroup>

                                    </FormControl>
                                    <FormControl id="selectCompany" isRequired>
                                        <FormLabel display={"flex"}
                                            alignItems={"center"}
                                            gap={2}
                                        >Select Company</FormLabel>
                                        <Select
                                            placeholder='Select Company'
                                            name="company"
                                        >
                                            <option value='Google'>Google</option>
                                            <option value='VisYad'>VisYad</option>
                                        </Select>

                                    </FormControl>
                                </HStack>
                                <FormControl id="userName" p={1}>
                                    <FormLabel display={"flex"}
                                        alignItems={"center"}
                                        gap={2}
                                    >Job Type</FormLabel>
                                    <Select
                                        placeholder='Select Job Type'
                                        name="jobType"
                                    >
                                        <option value='Part Time'>Part Time</option>
                                        <option value='Full Time'>Full Time</option>
                                    </Select>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        type='submit'
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'#48bb78'}
                                        color={'white'}
                                        _hover={{
                                            bg: '#22543d',
                                        }}>
                                        Post New Job
                                    </Button>
                                </Stack>

                            </Stack>
                        </Box>
                    </form>
                </Stack>
            </Flex>
        </>
    )
}

export default CreateJob
