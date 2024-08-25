import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Divider, Flex, Grid, Heading, IconButton, Spinner, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdNoteAlt } from "react-icons/md";
import { LuFileType } from "react-icons/lu";
import { FaRegAddressBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, jobById } from '../../redux/actions/jobActions'
import { IoDocumentTextSharp } from "react-icons/io5";
import { PiCertificateLight } from "react-icons/pi";
import { IoTimeSharp } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { TbMessageLanguage } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { applyJob } from '../../redux/actions/userAction';

const JobDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);
    const { error, loading, job } = useSelector(state => state.newJob);
    const isInitiallyApplied = job?.applications?.some(application => application.applicantId === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const {
        error: applyJobError,
        loading: applyJobLoading,
        success: isApply,
        message,
    } = useSelector(state => state.jobApplication);

    const handleApplyForJob = async () => {
        if (isAuthenticated === false && !user) {
            navigate('/login', { state: { from: `/job/detail/${job?._id}` } });
        }
        else {
            dispatch(applyJob(id))
        }
    };

    const requirementsHead = [
        { tag: "Experience need", icon: <PiSuitcaseSimpleFill color={"#48bb78"} />, text: `${job && job.experienceLevel} year*` },
        { tag: "Education", icon: <FaGraduationCap color={"#48bb78"} />, text: "Graduate" },
        { tag: "Role/category", icon: <PiCertificateLight color={"#48bb78"} />, text: `${job && job.title}` },
        { tag: "Hindi level", icon: <TbMessageLanguage color={"#48bb78"} />, text: "Hindi" },
        { tag: "Age limit", icon: <FaRegCalendarAlt color={"#48bb78"} />, text: "21 - 30 years" },
        { tag: "Gender", icon: <FaUser color={"#48bb78"} />, text: "M/F/T/O" },
    ];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (applyJobError) {
            toast.error(applyJobError);
            dispatch(clearError());
        }
        if (isApply) {
            setIsApplied(true);
            toast.success(message);
        }

        dispatch(jobById(id));
    }, [id, error, dispatch, applyJobError, isApply]);

    // Initial isApplied state check based on job data
    useEffect(() => {
        if (job && user) {
            const applied = job.applications.some(application => application.applicantId === user._id);
            setIsApplied(applied);
        }
        else {
            setIsApplied(false);
        }
    }, [job, user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    if (loading) {
        return (
            <Flex w="100vw" h="60vh" alignItems="center" justifyContent="center">
                <Spinner size="xl" />
            </Flex>
        );
    }
    return (
        <>
            <Box p={8}>
                <Box py={2}
                    boxShadow={colorMode === "light"
                        ? "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                        : "rgba(255, 255, 255, 0.2) 0px 3px 8px"
                    }
                    borderRadius={"4px"}
                    bg={colorMode === "dark" ? "" : "#ffffff"}
                >
                    <Flex mt={5} alignItems={"center"} justifyContent={"space-between"} px={8}>
                        <Box>
                            <Flex gap={6} alignItems={"center"}>
                                <Avatar src='' size={"md"} />
                                <Box>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"md"}
                                        fontFamily={"sans-serif"}
                                    >{job && job.title}</Text>
                                    <Text
                                        fontSize={"sm"}
                                        fontFamily={"sans-serif"}
                                        color={colorMode === "dark" ? "#c7c7c7" : "#171923"}
                                    >{job && job.comapanyId?.name}</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box px={12} mt={8} mb={4} >
                            <Button
                                isLoading={applyJobLoading}
                                isDisabled={isApplied}
                                width={"100%"} bg={"#48bb78"} _hover={{
                                    bg: "#48bb89"
                                }}
                                onClick={isApplied ? null : handleApplyForJob}
                            >
                                {isApplied ? "Applied" : "Apply For Job"}
                            </Button>
                        </Box>
                    </Flex>
                    <Box px={12} mt={8}>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <IoLocation fontSize={"20px"} color={"#48bb78"} />
                            <Text>{job && job.location}</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <FaMoneyCheckDollar fontSize={"20px"} color={"#48bb78"} />
                            <Text>
                                ₹{
                                    job && Math.round(job.salary / 12 - 20000)
                                } - ₹{job && Math.round(job.salary / 12)} monthly*
                            </Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <MdDateRange fontSize={"20px"} color={"#48bb78"} />
                            <Text><b style={{
                                color: colorMode === "dark" ? "#c7c7c7" : "#171923"
                            }}>Posted date: </b>
                                {
                                    job &&
                                    job.createdAt.substring(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join('-')
                                }
                            </Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={3} >
                            <MdNoteAlt fontSize={"20px"} color={"#48bb78"} />
                            <Text width={"50%"} noOfLines={3} size={"sm"}><b style={{
                                color: colorMode === "dark" ? "#c7c7c7" : "#171923"
                            }}>Description: </b>
                                {job && job.description}
                            </Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <LuFileType fontSize={"20px"} color={"#48bb78"} />
                            <Text><b style={{
                                color: colorMode === "dark" ? "#c7c7c7" : "#171923"
                            }}>Job Type: </b>
                                <span style={{
                                    background: `${colorMode === "dark" ? "#171923" : "#ffffff"}`,
                                    padding: "4px 12px",
                                    borderRadius: "4px",
                                    backgroundColor: colorMode === "dark" ? "#171923" : "#edf2f7"
                                }}>
                                    {job && job.jobType}
                                </span>
                            </Text>
                        </Flex>
                    </Box>
                    <Box px={12} mt={8} >
                        <Box bg={colorMode === "dark" ? "#171923" : "#edf2f7"}
                            color={colorMode === "dark" ? "#c7c7c7" : "#171923"} p={10}
                            borderRadius={"8px"}
                            boxShadow={colorMode === "light" && "rgba(149, 157, 165, 0.2) 0px 8px 24px"}
                        >
                            <Flex
                                alignItems={"center"}
                                gap={100}
                                mb={3}
                                px={3}
                            >
                                <Box>
                                    <Text size={"xs"}>Fixed</Text>
                                    <Heading size={"xs"}>
                                        ₹{
                                            job && Math.round(job.salary / 12 - 20000)
                                        } - ₹{job && Math.round(job.salary / 12)}
                                    </Heading>
                                </Box>
                                <Box>
                                    <Text size={"xs"}>Average Incentives*</Text>
                                    <Heading size={"xs"}>
                                        ₹{(job && Math.round(job.salary / 100 * 1))}
                                    </Heading>
                                </Box>
                                <Box>
                                    <Text size={"xs"}>Earning Potential</Text>
                                    <Heading size={"xs"}>
                                        ₹{
                                            (job && Math.round(job.salary / 12)) + ((job && Math.round(job.salary / 100) * 1))
                                        }
                                    </Heading>
                                </Box>
                            </Flex>
                            <Divider mb={3} borderColor={colorMode === "dark" ? "#c7c7c7" : "#8c8594"} />
                            <Flex alignItems={"center"} gap={2}>
                                <RiErrorWarningFill />
                                <Text
                                    size={"xs"} color={colorMode === "dark" ? "#c7c7c7" : "#171923"}
                                >You can earn more incentive if you perform well</Text>
                            </Flex>
                        </Box>
                    </Box>

                    <Box px={12} mt={8} mb={4}>
                        <Box bg={colorMode === "dark" ? "#171923" : "#edf2f7"}
                            color={colorMode === "dark" ? "#c7c7c7" : "#171923"} p={5}
                            borderRadius={"8px"}
                            boxShadow={colorMode === "light" && "rgba(149, 157, 165, 0.2) 0px 8px 24px"}
                        >
                            <Heading size={"sm"} mb={2}>Job highlights</Heading>
                            <Flex alignItems={"center"} gap={2} >
                                <FaPeopleGroup fontSize={"20px"} color={"#48bb78"} />
                                <Text>{job && job?.position} Applicants/Position</Text>
                            </Flex>
                        </Box>
                    </Box>
                    <Divider borderColor={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}></Divider>
                    <Box px={12} mt={8} mb={4} display={"flex"} flexDirection={"column"} gap={8}>
                        <Heading size={"sm"}>Job role</Heading>
                        <Box>
                            <Grid
                                templateColumns='repeat(2, 1fr)'
                                gap={2} maxW={"620px"}
                                alignItems={"center"}
                            >
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding color={"#48bb78"} />
                                        <Text
                                            color={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        {job && job.location} India
                                    </Text>
                                </Box>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <IoDocumentTextSharp color={"#48bb78"} />
                                        <Text
                                            color={colorMode === "dark" ? "#c7c7c7" : "#171923"}
                                            size={"xs"}
                                        >Department</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        Tech / {job && job.title}
                                    </Text>
                                </Box>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid templateColumns='repeat(2, 1fr)'
                                gap={2} maxW={"620px"}
                                alignItems={"center"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <PiCertificateLight color={"#48bb78"} />
                                        <Text
                                            color={colorMode === "dark" ? "#c7c7c7" : "#171923"}
                                            size={"xs"}
                                        >Category</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        {job && job.title}
                                    </Text>
                                </Box>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <IoTimeSharp color={"#48bb78"} />
                                        <Text
                                            color={colorMode === "dark" ? "#c7c7c7" : "#171923"}
                                            size={"xs"}
                                        >Employment Time</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        {job && job.jobType}
                                    </Text>
                                </Box>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid templateColumns='repeat(2, 1fr)'
                                gap={2} maxW={"620px"}
                                alignItems={"center"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaSun color={"#48bb78"} />
                                        <Text
                                            color={colorMode === "dark" ? "#c7c7c7" : "#171923"}
                                            size={"xs"}
                                        >Shift</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        {"Day Shift"}
                                    </Text>
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider borderColor={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}></Divider>
                    <Box px={12} mt={8} mb={4} display={"flex"} flexDirection={"column"} gap={8}>
                        <Heading size={"sm"}>Job requirements</Heading>
                        <Grid templateColumns='repeat(2, 1fr)'
                            gap={2} maxW={"620px"}
                            alignItems={"center"}
                            rowGap={6}
                        >

                            {
                                requirementsHead.map((requirement) => {
                                    return (
                                        <Box>
                                            <Flex alignItems={"center"} gap={2}>
                                                {requirement.icon}
                                                <Text
                                                    color={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}
                                                    size={"xs"}
                                                >{requirement.tag}</Text>
                                            </Flex>
                                            <Text ml={5}>
                                                {requirement.text}
                                            </Text>
                                        </Box>
                                    )
                                })
                            }
                            <Box>
                                <Flex alignItems={"center"} gap={2}>
                                    <FaPencilAlt color={"#48bb78"} />
                                    <Text
                                        color={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}
                                        size={"xs"}
                                    >Skills</Text>
                                </Flex>
                                <Text ml={5}>
                                    {
                                        job && job.requirements?.length > 0 &&
                                        job.requirements.map((requirement) => {
                                            return (
                                                <>
                                                    {requirement},
                                                </>
                                            )
                                        })
                                    }
                                </Text>
                            </Box>
                        </Grid>
                    </Box>
                    <Divider borderColor={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}></Divider>
                    <Box px={12} mt={8} mb={4} display={"flex"} flexDirection={"column"} gap={8}>
                        <Heading size={"sm"}>About company</Heading>
                        <Box>
                            <Flex alignItems={"center"} gap={2}>
                                <FaUser color={"#48bb78"} />
                                <Text
                                    color={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}
                                    size={"xs"}
                                >
                                    Name</Text>
                            </Flex>
                            <Text ml={5}>
                                {job && job.comapanyId?.name}
                            </Text>
                        </Box>
                        <Box>
                            <Flex alignItems={"center"} gap={2}>
                                <FaRegAddressBook color={"#48bb78"} />
                                <Text
                                    color={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}
                                    size={"xs"}
                                >Address</Text>
                            </Flex>
                            <Text ml={5}>
                                {job && job.comapanyId?.location}
                            </Text>
                        </Box>
                    </Box>
                    <Divider borderColor={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}></Divider>
                    <Flex width={"100%"} alignItems={"center"} justifyContent={"center"} gap={1} p={4}>
                        <Text color={colorMode === "dark" ? "#c7c7c7" : "#8c8594"}>Job posted by</Text>
                        <Heading size={"xs"}>{job && job.comapanyId?.name}</Heading>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default JobDetailPage
