import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Box,
    Heading,
    IconButton,
    Button,
    Text,
    Stack
} from '@chakra-ui/react'
import { FaRegBookmark } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const JobCard = ({ pathName }) => {
    return (
        <>
            <Link to={"/job/detail/1"}>
                <Card maxW='sm' gap={0}>
                    <CardHeader>
                        <Flex spacing='3'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                {
                                    !pathName &&
                                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                }
                                <Box>
                                    <Heading size='sm'>Company Name</Heading>
                                    <Text color={"#c5c5c5"}>India</Text>
                                </Box>
                            </Flex>
                            {
                                !pathName &&
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<FaRegBookmark />}
                                />
                            }
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
                            <Heading size='sm'>Title</Heading>
                            {
                                !pathName && <Text size={"xs"} color={"#c5c5c5"}>2 days ago</Text>
                            }
                        </Flex>
                        <Text>
                            With Chakra UI, I wanted to sync the speed of development with the speed
                            of design. I wanted the developer to be just as excited as the designer to
                            create a screen.
                        </Text>
                    </CardBody>


                    <CardFooter display={"flex"} flexDirection={"column"} gap={0}>
                        <Flex flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '50px',
                                },
                            }}
                        >
                            <Button flex='1'
                                fontSize={"14px"}
                                color={"blueviolet"} variant='ghost' leftIcon={<FaUserCheck />}>
                                12 postion
                            </Button>
                            <Button flex='1'
                                fontSize={"14px"}
                                variant='ghost' color={"red"} leftIcon={<FaHourglassHalf />}>
                                Part Time
                            </Button>
                            <Button flex='1'
                                fontSize={"14px"}
                                variant='ghost' color={"blue"} leftIcon={<FaMoneyCheckAlt />}>
                                24 LPA
                            </Button>
                        </Flex>
                        {
                            !pathName && <Stack mt={8} direction={'row'} spacing={4}>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                        bg: 'gray.200',
                                    }}>
                                    Details
                                </Button>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'#48bb78'}
                                    color={'white'}
                                    boxShadow={
                                        '0px 1px 25px -5px #48bb7894, 0 10px 10px -15px #fff'
                                    }
                                    _hover={{
                                        bg: '#39b96f',
                                    }}
                                    _focus={{
                                        bg: '#39b96f',
                                    }}>
                                    Save For Later
                                </Button>
                            </Stack>
                        }
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}

export default JobCard;
