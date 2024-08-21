import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const CourselCategory = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer"
    ]

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? category.length - 1 : prevIndex - 1
        );
        console.log(currentIndex)
      };
    
      const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === category.length - 1 ? 0 : prevIndex + 1
        );
        console.log(currentIndex)
      };

    return (
        <Box width={
            {
                base:"300px",
                md:"400px",
                xl:"520px"
            }
        } overflow={"hidden"}>
            <Flex gap={5} width="100%" overflowX="auto" whiteSpace="nowrap"
             transition="transform 0.5s ease-in-out"
             
            >
                {
                    category.map((cat, index) => (
                        <Text 
                        cursor={"pointer"}
                        border={"1px solid gray"}
                        fontSize={{
                            base:"sm",
                            md:"md",
                            xl:"16px"
                        }}
                        p={1} px={{
                            base:"2",
                            md:"3",
                            xl:"4"
                        }} 
                        borderRadius={"16px"}
                        key={index} width="180px"
                        >{cat}</Text>
                    ))
                }
            </Flex>
        </Box>
    )
}

export default CourselCategory
