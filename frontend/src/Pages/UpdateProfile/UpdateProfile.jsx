import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Flex, IconButton, Link, Spinner, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import ApplicationJobTable from '../../Components/ApplicationJobTable/ApplicationJobTable'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Center,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useImagePreview from '../../CustomHook/useImagePreview'
import { clearError, loadUser, updateProfile } from '../../redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import { clearErrors, getApplicatonOfApplicant } from '../../redux/actions/applicationAction'

const UpdateProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { isUpdated, loading, error, message } = useSelector(state => state.updateProfile);
    const {
        loading: applicationLoading,
        error: applicationError,
        applications
    } = useSelector(state => state.application);

    const [inputUpdateData, setInputUpdateData] = useState({
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.profile.bio,
        skills: user.profile.skills,
    });


    const fileRef = useRef(null);
    const fileRef2 = useRef(null);

    const { handleImageOnChange, imageUrl } = useImagePreview();

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputUpdateData({ ...inputUpdateData, [name]: value });
    }


    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        if (file) {
            setFileName(file.name);
        }
    };


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const userData = new FormData();
        userData.set('fullname', inputUpdateData.fullname);
        userData.set('email', inputUpdateData.email);
        userData.set('skills', inputUpdateData.skills);
        userData.set('bio', inputUpdateData.bio);
        userData.set('phoneNumber', inputUpdateData.phoneNumber);

        // Ensure `imageUrl` is a valid File or Blob
        if (imageUrl) {
            userData.append('profilePic', imageUrl);
        }

        if (fileName) {
            userData.append('resume', fileName);
        }

        dispatch(updateProfile(userData));

    }



    useEffect(() => {
        if (user) {
            setFileName(user.profile.resumeOriginalName)
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            toast.success(message);
            dispatch(loadUser());
            navigate('/profile/update');

            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
        if (applicationError) {
            toast.error(applicationError);
            dispatch(clearErrors());
        }
        dispatch(getApplicatonOfApplicant());
    }, [dispatch, error, navigate, isUpdated, applicationError]);



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    const Skills = user.profile.skills[0] || `
        Programming Languages:C.C++.Java.Python.JavaScript:
        Web Development:HTML.CSS.JavaScript.Reactjs.Nodejs.Expressjs:
        Database Management:SQL.MySQL.MongoDB:
        Operating Systems:Windows.Linux.UNIX:
        Version Control:Git.GitHub
        `
    const skillsHead1 = []
    const skillsHead2 = []
    const skillsHead3 = []

    Skills.split(":").forEach((skill) => {
        skillsHead1.push(skill);
    })


    skillsHead1.forEach((i, index) => {
        if (index % 2 == 0) {
            skillsHead2.push(i)
        }
        else {
            skillsHead3.push(i.split("."))
        }

    });


    return (
        <>
            <Box p={8}>
                <Box py={2}
                    boxShadow={colorMode === "light"
                        ? "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                        : "rgba(255, 255, 255, 0.2) 0px 3px 8px"
                    }
                    bg={colorMode === "light" ? "white" : ""}
                >
                    <Flex mt={5} alignItems={"center"} justifyContent={"space-between"} px={8}>
                        <Box>
                            <Flex gap={6} alignItems={"center"}>
                                <Avatar src={user && user.profile.profilePic} size={"md"} />
                                <Box>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"md"}
                                        fontFamily={"sans-serif"}
                                    >{user && user.fullname}</Text>
                                    <Text
                                        fontSize={"sm"}
                                        fontFamily={"sans-serif"}
                                    >{user && user.profile.bio}</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <IconButton
                                onClick={onOpen}
                                bg={colorMode === "light" ? "#ffffff" : "#3c3c3c"}
                                icon={<EditIcon />}
                                aria-label="Edit"
                            />
                        </Box>
                    </Flex>
                    <Box px={12} mt={8}>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <EmailIcon fontSize={"20px"} />
                            <Text>{user && user.email}</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3}>
                            <PhoneIcon fontSize={"20px"} />
                            <Text>+91-{user && user.phoneNumber}</Text>
                        </Flex>
                    </Box>
                    <Flex px={12} mt={8} gap={5} direction={"column"} mb={5}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"lg"}
                            fontFamily={"sans-serif"}
                        >Skills</Text>

                        {/* <Button>Programming Languages:</Button> */}
                        {
                            skillsHead2.map((skill, index) => {
                                return (
                                    <Flex gap={2} key={index}>
                                        <Button bg={colorMode === "light"
                                            ? "#edf2f7" : "#3c3c3c"}>{skill} :</Button>
                                        <Flex gap={2} alignItems={"center"} key={index}>
                                            {
                                                skillsHead3[index].map((s) => {
                                                    return (
                                                        <Box
                                                            key={index}
                                                            border={colorMode === "dark"
                                                                ? "1px solid white"
                                                                : "1px solid black"
                                                            }
                                                            borderRadius={"50px"}
                                                            px={5}
                                                            py={0.5}
                                                            bg={colorMode === "dark"
                                                                ? "black"
                                                                : "#ffffff"}
                                                        >{s}</Box>
                                                    )
                                                })
                                            }
                                        </Flex>
                                    </Flex>
                                )
                            })
                        }

                    </Flex>
                    <Box px={12} mt={8} mb={5}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"lg"}
                            fontFamily={"sans-serif"}
                        >Resume</Text>
                        <Flex gap={3} alignItems={"center"}>
                            <Link href={user && user.profile.resume}>
                                {user && user.fullname + "." + user.profile.resumeOriginalName}
                            </Link>
                            <Text>👈</Text>
                        </Flex>
                    </Box>
                    <Box px={12} mt={8} mb={6}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"lg"}
                            fontFamily={"sans-serif"}
                            mb={3}
                        >Applied Job</Text>
                        {
                            applicationLoading ? <Flex h={"20vh"} justifyContent={"center"} alignItems={"center"}>
                                <Spinner size={"md"} />
                            </Flex> : <ApplicationJobTable applications={applications} />
                        }
                    </Box>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleUpdateProfile}>
                    <ModalContent>
                        <ModalHeader>Update Profile</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex
                                align={'center'}
                                justify={'center'}
                            >
                                <Stack
                                    spacing={4}
                                    w={'full'}
                                    maxW={'md'}
                                    bg={useColorModeValue('white', 'gray.700')}
                                    rounded={'xl'}
                                    boxShadow={'lg'}
                                    p={6}
                                >
                                    <FormControl id="userName">
                                        <Stack direction={['column', 'row']} spacing={6}>
                                            <Center>
                                                <Avatar size="md"
                                                    src={(imageUrl && imageUrl) || user.profile.profilePic}>
                                                </Avatar>
                                            </Center>
                                            <Center w="full">
                                                <Button w="full"
                                                    onClick={() => fileRef.current.click()}
                                                >Change Profile</Button>
                                                <Input type='file' ref={fileRef}
                                                    onChange={handleImageOnChange} hidden />
                                            </Center>
                                        </Stack>
                                    </FormControl>
                                    <FormControl id="userName" isRequired>
                                        <FormLabel>Full name</FormLabel>
                                        <Input
                                            placeholder="UserName"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="text"
                                            name='fullname'
                                            onChange={handleOnChange}
                                            value={inputUpdateData.fullname}
                                        />
                                    </FormControl>
                                    <FormControl id="userName" isRequired>
                                        <FormLabel>Bio</FormLabel>
                                        <Input
                                            placeholder="Bio"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="text"
                                            name='bio'
                                            onChange={handleOnChange}
                                            value={inputUpdateData.bio}
                                        />
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email address</FormLabel>
                                        <Input
                                            placeholder="your-email@example.com"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="email"
                                            name='email'
                                            onChange={handleOnChange}
                                            value={inputUpdateData.email}
                                        />
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Skills</FormLabel>
                                        <Input
                                            placeholder="skill"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="text"
                                            name='skills'
                                            onChange={handleOnChange}
                                            value={inputUpdateData.skills}
                                        />
                                        <Text
                                            mt={1}
                                            mx={1}
                                            fontSize={"12px"}
                                            color={"#48bc58"}>
                                            <b>Enter Like this</b>: Operating Systems:Windows.Linux.UNIX:
                                            Version Control:Git.GitHub</Text>
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                            placeholder="Phone Number"
                                            _placeholder={{ color: 'gray.500' }}
                                            type="number"
                                            name='phoneNumber'
                                            onChange={handleOnChange}
                                            value={inputUpdateData.phoneNumber}
                                        />
                                    </FormControl>
                                    <FormControl id="number">
                                        <FormLabel>Upload Resume</FormLabel>
                                        <Center w="full">
                                            {
                                                fileName && (
                                                    <>
                                                        <Button w="full"
                                                            onClick={() => fileRef2.current.click()}
                                                        >{fileName || "Change Profile"}</Button>
                                                        <Input type='file' onChange={handleFileChange}
                                                            ref={fileRef2} hidden
                                                        />
                                                    </>
                                                )
                                            }
                                        </Center>
                                    </FormControl>

                                </Stack>
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Stack spacing={6} direction={['column', 'row']}>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'red.500',
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    isLoading={loading}
                                    loadingText={"Updating..."}
                                    bg={'#48bb78'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: '#48bc58',
                                    }}>
                                    Update
                                </Button>
                            </Stack>

                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default UpdateProfile
