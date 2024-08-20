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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom'
import { clearError, login } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated, message,token } = useSelector((state) => state.user);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(login(email, password, role));
    }

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
        <Flex
            minH={"100vh"}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={7} mx={'auto'} maxW={'lg'} py={12} px={6}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign in
                    </Heading>
                </Stack>
                <form onSubmit={handleLogin}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'lg'}
                        p={8}
                        w={{
                            lg: "400px",
                            sm: '100%',     // Small screens like tablets
                            md: '100%',     // Medium screens like laptops
                        }}
                    >
                        <Stack spacing={4}>

                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
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
                                        onChange={(e) => setRole(e.target.value)}
                                        value={role}
                                    >
                                        <option value='student'>Student</option>
                                        <option value='recruiter'>Recruiter</option>
                                    </Select>

                                </FormControl>
                            </HStack>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
                                    isLoading={loading}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Don't have account? <Link to={'/register'}>sign up</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}