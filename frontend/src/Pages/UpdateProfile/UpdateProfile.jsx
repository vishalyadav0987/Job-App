import React from 'react'
import { Avatar, Box, Button, Flex, IconButton, Link, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
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
    Heading,
    Input,
    Stack,
    HStack,
    AvatarBadge,
    Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

const UpdateProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    const Skills = `
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

    })


    return (
        <>
            <Box p={8}>
                <Box py={2}
                    boxShadow={colorMode === "light"
                        ? "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                        : "rgba(255, 255, 255, 0.2) 0px 3px 8px"
                    }
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
                                    >Vishal Yadav</Text>
                                    <Text
                                        fontSize={"sm"}
                                        fontFamily={"sans-serif"}
                                    >Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>
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
                            <Text>Vishalyadav@gmail.com</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3}>
                            <PhoneIcon fontSize={"20px"} />
                            <Text>+91 9023456723</Text>
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
                                    <Flex gap={2}>
                                        <Button bg={colorMode === "light"
                                            ? "#ffffff" : "#3c3c3c"}>{skill} :</Button>
                                        <Flex gap={2} alignItems={"center"} key={index}>
                                            {
                                                skillsHead3[index].map((s) => {
                                                    return (
                                                        <Box
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
                            <Link href='#'>
                                Vishalyadav.resume.png
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
                        <ApplicationJobTable />
                    </Box>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
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
                                            <Avatar size="md" src="https://bit.ly/sage-adebayo">
                                            </Avatar>
                                        </Center>
                                        <Center w="full">
                                            <Button w="full">Change Profile</Button>
                                        </Center>
                                    </Stack>
                                </FormControl>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>Full name</FormLabel>
                                    <Input
                                        placeholder="UserName"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        placeholder="your-email@example.com"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="email"
                                    />
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Skills</FormLabel>
                                    <Input
                                        placeholder="skill"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                    <Text
                                    mt={1}
                                    mx={1}
                                        fontSize={"12px"}
                                        color={"#48bc58"}>
                                        <b>Enter Like this</b>: Operating Systems:Windows.Linux.UNIX:
                                        Version Control:Git.GitHub</Text>
                                </FormControl>
                                <FormControl id="number" isRequired>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        placeholder="Phone Number"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="number"
                                    />
                                </FormControl>
                                <FormControl id="number" isRequired>
                                    <FormLabel>Upload Resume</FormLabel>
                                    <Center w="full">
                                        <Button w="full">Change Profile</Button>
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
            </Modal>
        </>
    )
}

export default UpdateProfile
