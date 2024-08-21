import { background, border, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import '../index.css'
import { motion } from "framer-motion";


const Mode = ({ top, right, width, height, index }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => setIsOn(!isOn);

    const bothToggle = () => {
        toggleSwitch();
        toggleColorMode();
    }

    useEffect(() => {
        if (colorMode === "dark") {
            setIsOn(true);
        }
        else {
            setIsOn(false)
        }
    }, [colorMode])

    const styles = {
        top: top,
        right: right,
        width: width,
        height: height,
        background: colorMode === "dark" ? "none" : " rgba(255, 255, 255, 0.4)",
        border: colorMode === "light" ? "none" : "none",
        zIndex: index
    }
    return (
        <>
            <div className="switch" style={styles} data-ison={isOn} onClick={bothToggle}>
                <motion.div layout transition={spring}>
                    {
                        !isOn ? <IoSunny /> : <FaMoon />
                    }
                </motion.div>
            </div>
        </>
    )
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};


export default Mode
