'use client';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Avatar,
    Portal,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Divider,
    Heading,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Mode from '../../Mode(LIight and dark)/Mode';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';
import Logo from '../../Svgs/Logo';
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const dispatch = useDispatch();
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const handleLogout = async () => {
        dispatch(logout());
        toast.success("User Succesfully logout!")
    }
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 3 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={"center"}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        fontWeight={"bold"}
                        color={useColorModeValue('gray.800', 'white')}>
                        <Link to={"/"}>
                            <Flex alignItems={"center"} gap={1.5}>
                                <Logo color={useColorModeValue('gray.700', 'white')} />
                                <Heading size={"md"}>Job Finder</Heading>
                            </Flex>
                        </Link>
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav user={user} />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    alignItems={"center"}
                    direction={'row'}
                    spacing={6}>
                    <Mode top={user ? "20px" : "14px"} right={user ? "80px" : "180px"} index={100} />
                    {
                        user && isAuthenticated ?
                            <>

                                <Popover trigger={'hover'} placement={'bottom-start'}>
                                    <PopoverTrigger>
                                        <Avatar size="md"
                                            src={user && user?.profile.profilePic}>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverHeader>Header</PopoverHeader>
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                {
                                                    user && user.role === "student" &&
                                                    <>
                                                        <Link to={'/profile/update'} style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            marginBottom: "12px"
                                                        }}>
                                                            <ImProfile />
                                                            <Text>View Profile</Text>
                                                        </Link>
                                                        <Divider mb={3} />
                                                    </>
                                                }
                                                <Button
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    gap={2}
                                                    bg={"#48bb78"}
                                                    _hover={{
                                                        bg: "#22543d"
                                                    }}
                                                    isLoading={loading}
                                                    onClick={handleLogout}
                                                >
                                                    <IoIosLogOut />
                                                    Logout</Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>

                            </>
                            : <>
                                <Link to={"/login"}>
                                    <Button fontSize={'sm'} fontWeight={400} variant={'link'}>
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to={'/register'}>
                                    <Button
                                        display={{ base: 'none', md: 'inline-flex' }}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={'white'}
                                        bg={'#48bb78'}
                                        _hover={{
                                            bg: '#22543d',
                                        }}>
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                    }
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav user={user} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = ({ user }) => {
    const navLinks = user && user.role === "student" ? NAV_ITEMS : NAV_ITEMS1
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {navLinks.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                as="a"
                                p={2}
                                to={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {

    return (
        <Link
            as="a"
            to={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = ({ user }) => {
    const navLinks = user && user.role === "student" ? NAV_ITEMS : NAV_ITEMS1
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {navLinks.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Link
                py={2}
                as="a"
                to={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Link>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link as="a" key={child.label} py={2} to={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

// Define the NAV_ITEMS array directly in JavaScript
const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Jobs',
        href: '/jobs',
    },
    {
        label: 'Inspiration',
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'Find Work',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
];

const NAV_ITEMS1 = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Company',
        href: '/admin/companies',
    },
    {
        label: 'Job',
        href: '/admin/jobs',
    },
]
