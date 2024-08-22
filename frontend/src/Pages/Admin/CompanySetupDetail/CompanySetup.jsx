import { Avatar, Box, Button, Center, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Text, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import useImagePreview from '../../../CustomHook/useImagePreview';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaBuilding } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearErrors, getCompanyById, updateCompanyDetails } from '../../../redux/actions/companyAction';
import { UPDATE_COMPANY_DETAILS_RESET } from '../../../redux/constants/companyConstant';


const CompanySetup = () => {
    const { id } = useParams()
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleImageOnChange, imageUrl } = useImagePreview();
    const { company } = useSelector(state => state.newCompany)
    const { loading, message, error, isUpdated } = useSelector(state => state.updateCompany);
    const { error: singleCompanyError, company: singleCompany } = useSelector(state => state.singalCompanyById);
    const [inputs, setInputs] = useState({
        name: company && company.name,
        description: "",
        location: company && company.location,
        website: "",
    });

    const handleOnchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", inputs.name);
        formData.set("description", inputs.description);
        formData.set("location", inputs.location);
        formData.set("website", inputs.website);

        if (imageUrl) {
            formData.append("logoImg", imageUrl);
        }

        dispatch(updateCompanyDetails(id, formData))
    }

    useEffect(() => {
        if (singleCompany && singleCompany._id !== id) {
            dispatch(getCompanyById(id));
        }
        else {
            setInputs({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                location: singleCompany.location || "",
                website: singleCompany.website || "",
            });

        }
        if (singleCompanyError) {
            alert.error(singleCompanyError);
            dispatch(clearErrors())
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success(message);
            navigate('/admin/companies');
            dispatch({
                type: UPDATE_COMPANY_DETAILS_RESET,
            })
        }

    }, [isUpdated, dispatch, error, navigate, singleCompanyError, singleCompany, id]);


    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <>
            <Flex align={'center'} justify={'center'}>
                <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Company Setup
                        </Heading>
                    </Stack>
                    <form onSubmit={handleUpdateCompany}>
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
                                                name="name"
                                                placeholder='Enter company name'
                                                onChange={handleOnchange}
                                                value={inputs.name}
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
                                                onChange={handleOnchange}
                                                value={inputs.description}
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
                                                onChange={handleOnchange}
                                                value={inputs.website}
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
                                                onChange={handleOnchange}
                                                value={inputs.location}
                                            />
                                        </InputGroup>

                                    </FormControl>
                                </HStack>
                                <FormControl id="userName" p={1}>
                                    <Stack direction={['column', 'row']} spacing={6}>
                                        <Center>
                                            <Avatar size="md"
                                                src={
                                                    (imageUrl && imageUrl)
                                                    || (singleCompany && singleCompany.logoImg)
                                                }>
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
                                        loadingText="Updating"
                                        isLoading={loading}
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
                                                display: 'flex', alignItems: "center",
                                                justifyContent: "center",
                                                gap: "6px"
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
