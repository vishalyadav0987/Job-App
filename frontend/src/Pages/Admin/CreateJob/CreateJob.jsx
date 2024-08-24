import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, Stack, useColorModeValue, Text, InputLeftElement, Select } from '@chakra-ui/react'
import { FaBuilding } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { clearError, postNewJob } from '../../../redux/actions/jobActions';
import { getALLCompany } from '../../../redux/actions/companyAction'
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { SiExpensify } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { FaCodePullRequest } from "react-icons/fa6";
import { POST_NEW_JOB_RESET } from '../../../redux/constants/jobConstants';

const CreateJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, loading, error: jobError, message } = useSelector((state) => state.newJob);
    const { companies, error } = useSelector(state => state.getAllCompany)
    const [jobInput, setJobInputs] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experience: "",
        location: "",
        jobType: "",
        position: 0,
    });

    const handleOnChange = (e) => {
        setJobInputs({ ...jobInput, [e.target.name]: e.target.value })
    }


    const handleSelectCompanyChange = (value) => {
        if (companies) {
            const selectedCompany = companies.find((company) => company.name === value);
            setJobInputs({ ...jobInput, companyId: selectedCompany?._id })
        }
    }

    const handlePostJob = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("title", jobInput.title);
        formData.set("description", jobInput.description);
        formData.set("experience", jobInput.experience);
        formData.set("jobType", jobInput.jobType);
        formData.set("location", jobInput.location);
        formData.set("position", jobInput.position);
        formData.set("requirements", jobInput.requirements);
        formData.set("salary", jobInput.salary);
        formData.set("companyId", jobInput.companyId);

        dispatch(postNewJob(formData));
    }




    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (jobError) {
            toast.error(jobError);
            dispatch(clearError());
        }
        if (success) {
            toast.success(message);
            navigate(`/admin/jobs`);
            dispatch({
                type: POST_NEW_JOB_RESET
            })
        }
        dispatch(getALLCompany());
    }, [error, dispatch, navigate, jobError, success]);



    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // })


    return (
        <>
            <Flex align={'center'} justify={'center'}>
                <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'2xl'} textAlign={'center'}>
                            Create Job
                        </Heading>
                    </Stack>
                    <form onSubmit={handlePostJob}>
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
                                                name="title"
                                                placeholder='Enter job name'
                                                onChange={handleOnChange}
                                                value={jobInput.title}
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
                                                onChange={handleOnChange}
                                                value={jobInput.description}
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
                                                name="position"
                                                placeholder='No of postion'
                                                onChange={handleOnChange}
                                                value={jobInput.position}
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
                                                onChange={handleOnChange}
                                                value={jobInput.location}
                                            />
                                        </InputGroup>

                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl id="website" isRequired>
                                        <FormLabel>Requirements</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <FaCodePullRequest color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="requirements"
                                                placeholder='requirements'
                                                onChange={handleOnChange}
                                                value={jobInput.requirements}
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
                                                <RiMoneyDollarBoxFill color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type='text'
                                                name="salary"
                                                placeholder='Salary in LPA'
                                                onChange={handleOnChange}
                                                value={jobInput.salary}
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
                                                <SiExpensify color='#c5c5c5' />
                                            </InputLeftElement>
                                            <Input focusBorderColor='#48bb78' type="text"
                                                name="experience"
                                                placeholder='Experience'
                                                onChange={handleOnChange}
                                                value={jobInput.experience}
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
                                            onChange={(e) => {

                                                handleSelectCompanyChange(e.target.value)
                                            }}

                                        >
                                            {
                                                companies && companies.length > 0 &&
                                                companies.map((company) => {
                                                    return (
                                                        <>
                                                            <option
                                                                value={company.name}>
                                                                {company.name}
                                                            </option>
                                                        </>
                                                    )
                                                })
                                            }
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
                                        onChange={handleOnChange}
                                        value={jobInput.jobType}
                                    >
                                        <option value='Part Time'>Part Time</option>
                                        <option value='Full Time'>Full Time</option>
                                    </Select>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        type='submit'
                                        loadingText="Posting.."
                                        isLoading={loading}
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
