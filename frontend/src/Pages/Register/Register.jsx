'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
    Center,
    Avatar,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import useImagePreview from '../../CustomHook/useImagePreview'
import { clearError, register } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated, message, token } = useSelector((state) => state.user);
    const { handleImageOnChange, imageUrl } = useImagePreview();
    const [inputs, setInputs] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
    });

    const imageRef = useRef(null);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = new FormData();
        userData.set('fullname', inputs.fullname);
        userData.set('email', inputs.email);
        userData.set('password', inputs.password);
        userData.set('role', inputs.role);
        userData.set('phoneNumber', inputs.phoneNumber);

        // Ensure `imageUrl` is a valid File or Blob
        if (imageUrl) {
            userData.append('profilePic', imageUrl);
        }


        dispatch(register(userData));
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (isAuthenticated) {
            Cookies.set('token', token); // लॉगिन के बाद कुकीज़ में टोकन सेट करें
            navigate('/');
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message, isAuthenticated, navigate]);

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <form onSubmit={handleRegister}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>Full Name</FormLabel>
                                        <Input type="text"
                                            name="fullname"
                                            onChange={handleOnChange}
                                            value={inputs.fullname}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input type="number"
                                            name="phoneNumber"
                                            onChange={handleOnChange}
                                            value={inputs.phoneNumber}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    name="email"
                                    onChange={handleOnChange}
                                    value={inputs.email}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onChange={handleOnChange}
                                        value={inputs.password}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <HStack>
                                <FormControl isRequired>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        placeholder='Role'
                                        name="role"
                                        onChange={(e) => handleOnChange(e)}
                                        value={inputs.role}
                                    >
                                        <option value='student'>Student</option>
                                        <option value='recruiter'>Recruiter</option>
                                    </Select>

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
                                        <Input type='file'
                                            onChange={handleImageOnChange}
                                            ref={imageRef}
                                            hidden
                                        />
                                    </Center>
                                </Stack>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    isLoading={loading}
                                    type='submit'
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to={'/login'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    );
}
