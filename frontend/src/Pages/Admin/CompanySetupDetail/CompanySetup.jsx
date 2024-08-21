import { Avatar, Box, Button, Center, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Text, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import useImagePreview from '../../../CustomHook/useImagePreview';
import { Link } from 'react-router-dom'
import { FaBuilding } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { ArrowBackIcon } from '@chakra-ui/icons';

const CompanySetup = () => {
    const imageRef = useRef(null);
    const { handleImageOnChange, imageUrl } = useImagePreview();
    return (
        <>
            <Flex align={'center'} justify={'center'}>
                <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Company Setup
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
                                        <FormLabel>Comapny Name</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <FaBuilding color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="companyName"
                                                placeholder='Enter company name'
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
                                        <FormLabel>Website</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <IoIosLink color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="website"
                                                placeholder='url'
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
                                <FormControl id="userName" p={1}>
                                    <Stack direction={['column', 'row']} spacing={6}>
                                        <Center>
                                            <Avatar size="md"
                                                src={imageUrl && imageUrl}>
                                            </Avatar>
                                        </Center>
                                        <Center w="full">
                                            <Button w="full"
                                                onClick={() => imageRef.current.click()}>Change Icon</Button>
                                            <Input focusBorderColor='#48bb78' type='file'
                                                onChange={handleImageOnChange}
                                                ref={imageRef}
                                                hidden
                                            />
                                        </Center>
                                    </Stack>
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
                                        Update
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Button align={'center'} w={"fit-content"}>
                                        <Link to={'/admin/company/create'} 
                                        style={{
                                            display:'flex',alignItems:"center",
                                            justifyContent:"center",
                                            gap:"6px"
                                            }}>
                                            <ArrowBackIcon
                                                fontSize={"20px"} />
                                            Back
                                        </Link>
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

export default CompanySetup
