import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, Stack, useColorModeValue, Text, InputLeftElement, Select, Spinner } from '@chakra-ui/react'
import { FaBuilding } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { SiExpensify } from "react-icons/si";
import { useNavigate, useParams } from 'react-router-dom';
import { FaCodePullRequest } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { clearError, jobById, updateJob } from '../../redux/actions/jobActions';
import { clearErrors, getALLCompany } from '../../redux/actions/companyAction';
import { UPDATE_JOB_DETIALS_RESET } from '../../redux/constants/jobConstants';

const EditJobDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { job: singleJob, error: singleJobError, loading: singleJobLoading } = useSelector(state => state.newJob);
    const { error } = useSelector(state => state.getAllCompany);
    const { loading: updateLoading, error: updateError, isUpdate, message } = useSelector(state => state.updateJobDetails);
    const [jobInput, setJobInputs] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experienceLevel: "",
        location: "",
        jobType: "",
        position: 0,
        companyId: "",
    });

    const handleOnChange = (e) => {
        setJobInputs({ ...jobInput, [e.target.name]: e.target.value });
    };

    const handleEditJob = async (e) => {
        e.preventDefault();
        dispatch(updateJob(id, jobInput));
    };

    useEffect(() => {
        if (singleJob) {
            setJobInputs({
                title: singleJob.title,
                description: singleJob.description,
                requirements: singleJob.requirements,
                salary: singleJob.salary,
                experienceLevel: singleJob.experienceLevel,
                location: singleJob.location,
                jobType: singleJob.jobType,
                position: singleJob.position,
                companyId: singleJob.comapanyId?._id,
            });
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(clearError());
        }
        if (singleJobError) {
            toast.error(singleJobError);
            dispatch(clearError());
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdate) {
            toast.success(message);
            navigate('/admin/jobs');
            console.log('Dispatching UPDATE_JOB_DETAILS_RESET');
            dispatch({ type: UPDATE_JOB_DETIALS_RESET });
        }


        dispatch(jobById(id));

        dispatch(getALLCompany());
    }, [dispatch, navigate, singleJobError, error, id, updateError, isUpdate,]);

    if (singleJobLoading) {
        return (
            <Flex w={"100vw"} height={"40vh"} alignItems={"center"} justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'2xl'} textAlign={'center'}>
                        Edit Job Details
                    </Heading>
                </Stack>
                <form onSubmit={handleEditJob}>
                    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            {/* Form fields */}
                            <Box>
                                <FormControl id="title" isRequired>
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
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <MdEditNote color='#c5c5c5' />
                                        </InputLeftElement>
                                        <Input focusBorderColor='#48bb78' type="text"
                                            name="description"
                                            placeholder='Description'
                                            onChange={handleOnChange}
                                            value={jobInput.description}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Box>
                            <HStack>
                                <FormControl id="position" isRequired>
                                    <FormLabel>No of Position</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <IoIosLink color='#c5c5c5' />
                                        </InputLeftElement>
                                        <Input focusBorderColor='#48bb78' type="number"
                                            name="position"
                                            placeholder='No of positions'
                                            onChange={handleOnChange}
                                            value={jobInput.position}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="location" isRequired>
                                    <FormLabel>Location</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <MdLocationPin color='#c5c5c5' />
                                        </InputLeftElement>
                                        <Input focusBorderColor='#48bb78' type='text'
                                            name="location"
                                            placeholder='Company location'
                                            onChange={handleOnChange}
                                            value={jobInput.location}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="requirements" isRequired>
                                    <FormLabel>Requirements</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <FaCodePullRequest color='#c5c5c5' />
                                        </InputLeftElement>
                                        <Input focusBorderColor='#48bb78' type="text"
                                            name="requirements"
                                            placeholder='Requirements'
                                            onChange={handleOnChange}
                                            value={jobInput.requirements}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="salary" isRequired>
                                    <FormLabel display={"flex"} alignItems={"center"} gap={2}>
                                        Salary <Text fontSize={"12px"} color={"#c5c5c5"}>(in LPA)</Text>
                                    </FormLabel>
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
                                <FormControl id="experience" isRequired>
                                    <FormLabel display={"flex"} alignItems={"center"} gap={2}>
                                        Experience<Text fontSize={"12px"} color={"#c5c5c5"}>(in years)</Text>
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <SiExpensify color='#c5c5c5' />
                                        </InputLeftElement>
                                        <Input focusBorderColor='#48bb78' type="text"
                                            name="experienceLevel"
                                            placeholder='Experience'
                                            onChange={handleOnChange}
                                            value={jobInput.experienceLevel}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </HStack>
                            <FormControl id="jobType" p={1}>
                                <FormLabel display={"flex"} alignItems={"center"} gap={2}>
                                    Job Type
                                </FormLabel>
                                <Select
                                    focusBorderColor='#48bb78'
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
                                    loadingText="Updating.."
                                    isLoading={updateLoading}
                                    size="lg"
                                    bg={'#48bb78'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#22543d',
                                    }}>
                                    Update Job
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    );
};

export default EditJobDetails;
