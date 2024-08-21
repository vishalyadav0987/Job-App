import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Divider, Flex, Heading, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdNoteAlt } from "react-icons/md";
import { LuFileType } from "react-icons/lu";

const JobDetailPage = () => {
    const { colorMode } = useColorMode();
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <>
            <Box p={8}>
                <Box py={2}
                    boxShadow={colorMode === "light"
                        ? "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                        : "rgba(255, 255, 255, 0.2) 0px 3px 8px"
                    }
                    borderRadius={"4px"}
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
                                    >Job Title</Text>
                                    <Text
                                        fontSize={"sm"}
                                        fontFamily={"sans-serif"}
                                        color={"#c7c7c7"}
                                    >Job Holder</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box px={12} mt={8} mb={4} >
                            <Button width={"100%"} bg={"#48bb78"} _hover={{
                                bg: "#48bb89"
                            }}>Apply For Job</Button>
                        </Box>
                    </Flex>
                    <Box px={12} mt={8}>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <IoLocation fontSize={"20px"} />
                            <Text>Vemali Village, Vadodara</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <FaMoneyCheckDollar fontSize={"20px"} />
                            <Text>₹13,800 - ₹28,000 monthly*</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <MdDateRange fontSize={"20px"} />
                            <Text><b style={{ color: "#c7c7c7" }}>Posted date: </b>24-08-24</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <MdNoteAlt fontSize={"20px"} />
                            <Text size={"sm"}><b style={{ color: "#c7c7c7" }}>Description: </b>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, fuga.</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={3} mb={2}>
                            <LuFileType fontSize={"20px"} />
                            <Text><b style={{ color: "#c7c7c7" }}>Job Type: </b>
                                <span style={{
                                    background: `${colorMode === "dark" ? "#171923" : "#ffffff"}`,
                                    padding:"4px 12px",
                                    borderRadius:"4px"
                                }}>
                                    Part Time
                                </span>
                            </Text>
                        </Flex>
                    </Box>
                    <Box px={12} mt={8}>
                        <Box bg={"#171923"} color={"#c7c7c7"} p={10}
                            borderRadius={"8px"}
                        >
                            <Flex
                                alignItems={"center"}
                                gap={100}
                                mb={3}
                                px={3}
                            >
                                <Box>
                                    <Text size={"xs"}>Fixed</Text>
                                    <Heading size={"xs"}>₹13800 - ₹25000</Heading>
                                </Box>
                                <Box>
                                    <Text size={"xs"}>Fixed</Text>
                                    <Heading size={"xs"}>₹13800 - ₹25000</Heading>
                                </Box>
                                <Box>
                                    <Text size={"xs"}>Fixed</Text>
                                    <Heading size={"xs"}>₹13800 - ₹25000</Heading>
                                </Box>
                            </Flex>
                            <Divider mb={3} />
                            <Flex alignItems={"center"} gap={2}>
                                <RiErrorWarningFill />
                                <Text
                                    size={"xs"} color={"#c7c7c7"}
                                >You can earn more incentive if you perform well</Text>
                            </Flex>
                        </Box>
                    </Box>

                    <Box px={12} mt={8} mb={4}>
                        <Box bg={"#171923"} color={"#c7c7c7"} p={5}
                            borderRadius={"8px"}
                        >
                            <Heading size={"sm"} mb={2}>Job highlights</Heading>
                            <Flex alignItems={"center"} gap={2} >
                                <FaPeopleGroup fontSize={"20px"} color={"#48bb78"} />
                                <Text>55 Applicants</Text>
                            </Flex>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <Box px={12} mt={8} mb={4} display={"flex"} flexDirection={"column"} gap={8}>
                        <Heading size={"sm"}>Job role</Heading>
                        <Box>
                            <Flex alignItems={"center"} maxW={"620px"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex alignItems={"center"} maxW={"620px"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex alignItems={"center"} maxW={"620px"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <Box px={12} mt={8} mb={4} display={"flex"} flexDirection={"column"} gap={8}>
                        <Heading size={"sm"}>Job requirements</Heading>
                        <Box>
                            <Flex alignItems={"center"} maxW={"620px"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex alignItems={"center"} maxW={"620px"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex alignItems={"center"} maxW={"620px"}>
                                <Box>
                                    <Flex alignItems={"center"} gap={2}>
                                        <FaBuilding />
                                        <Text
                                            color={"#c7c7c7"}
                                            size={"xs"}
                                        >Work location</Text>
                                    </Flex>
                                    <Text ml={5}>
                                        S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <Box px={12} mt={8} mb={4} display={"flex"} flexDirection={"column"} gap={8}>
                        <Heading size={"sm"}>About company</Heading>
                        <Box>
                            <Flex alignItems={"center"} gap={2}>
                                <FaBuilding />
                                <Text
                                    color={"#c7c7c7"}
                                    size={"xs"}
                                >
                                    Name</Text>
                            </Flex>
                            <Text ml={5}>
                                Lakshminarayan Fincorp
                            </Text>
                        </Box>
                        <Box>
                            <Flex alignItems={"center"} gap={2}>
                                <FaBuilding />
                                <Text
                                    color={"#c7c7c7"}
                                    size={"xs"}
                                >Address</Text>
                            </Flex>
                            <Text ml={5}>
                                S9 square, Sama-Savli Road, Vemali, Vadodara, Gujarat, India
                            </Text>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <Flex width={"100%"} alignItems={"center"} justifyContent={"center"} gap={1} p={4}>
                        <Text color={"#c7c7c7"}>Job posted by</Text>
                        <Heading size={"xs"}>Lakshminarayan Fincorp</Heading>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default JobDetailPage
