import { useEffect, useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const HelpComponent = memo(function Help({ modalOpen, setModalOpen }) {
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const modalVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: -10,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                mass: 0.5,
            }
        },
        hidden: {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 160,
                damping: 10,
                mass: 0.5,
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // This will stagger the animation of child elements
                delayChildren: 0.3,   // This will delay the start of children animations
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            }
        }
    }

    const handleCloseModal = (e) => {
        if (e.target.id === "backdrop") {
            setModalOpen(false);
        }
    };

    return (
        <>
            <motion.div className="flex justify-center items-center border-2 rounded-full w-8 h-8 border-gray-95 hover:cursor-pointer " 
                onClick={toggleModal}
                whileHover={{ rotate: 30 }}
                transition={{ type: 'spring', stiffness: 160, damping: 5, mass: 0.9 }}
            >
                <h3 className="text-sm font-semibold leading-none tracking-tight hover:cursor-pointer">?</h3>
            </motion.div>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        key='modal'
                        initial='hidden' 
                        animate={modalOpen ? 'visible' : 'hidden'}
                        exit={{ opacity: 0 }}
                        variants={modalVariants} 
                        className="fixed z-50 h-[105vh] inset-0 bg-black w-full bg-opacity-0 backdrop-blur-sm flex justify-center items-center"
                        id="backdrop"
                        onClick={handleCloseModal}
                        style={{ borderRadius: modalOpen ? "0px" : "25px" }} 
                    >
                        <motion.div 
                            layout 
                            style={{borderRadius: 20}} 
                            className="flex flex-col dark:bg-gray-200 dark:text-gray-950 overflow-scroll lg:max-w-60w md:max-w-70w sm:max-w-80w max-w-80w max-h-70 bg-gray-900 text-gray-100 z-50 relative p-6 " 
                            initial={{ scale: 0.5 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0.5 }}
                        >
                            <motion.div 
                                variants={containerVariants}
                                key={modalOpen ? "open" : "closed"}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div variants={itemVariants} className="flex flex-col w-full dark:bg-gray-400 px-4 py-4 rounded-md bg-gray-800">
                                    <h2 className="text-xl font-semibold">Thumbnail Generator</h2>
                                    <p>How-to Guide</p>
                                </motion.div>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 1: Select Brand</motion.h4>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 2: Select your Series</motion.h4>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 3: Upload your thumbnail image</motion.h4>
                                <motion.h5 variants={itemVariants} className="text-sm ml-4 mt-2">a. Paste your YouTube video URL and pull the current thumbnail</motion.h5>
                                <motion.h5 variants={itemVariants} className="text-sm ml-4 mt-2">b. Upload an image file from your computer</motion.h5>
                                <motion.h5 variants={itemVariants} className="text-sm ml-4 mt-2">c. Drag n Drop an image to upload</motion.h5>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 4: Add text if permitted</motion.h4>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 5: Click <span className="font-bold ">Generate Thumbnail</span> to see the finished product!</motion.h4>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 6: Toggle the <span className="font-bold ">Adjust</span> switch to make any changes</motion.h4>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 7: Click the <span className="font-bold ">Reset Thumbnail</span> button at any time to start over from the original image</motion.h4>
                                <motion.h4 variants={itemVariants} className="text-md font-semibold mt-4">Step 8: Click <span className="font-bold ">Download Thumbnail (cmd + enter)</span> to save your image</motion.h4>
                                <motion.div variants={itemVariants} className="flex flex-col p-2 pb-4 rounded-md dark:border-gray-900 border-gray-100 mt-4 outline-dotted">
                                    <h4 className="text-md font-semibold">How to Crop</h4>
                                    <h5 className="text-sm ml-4 mt-2">- Drag to select the area on the image that you would like to crop</h5>
                                    <h5 className="flex text-sm ml-4 mt-2">- After selection is made, press the <span className="sm:mx-2 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path d="M6.13 1L6 16a2 2 0 002 2h15" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M1 6.13L16 6a2 2 0 012 2v15" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg></span>button to crop the image
                                    </h5>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex">
                                    <p className="flex cursor-pointer mt-6 py-2 px-4 rounded-md dark:hover:bg-gray-800 hover:bg-gray-200 duration-200 dark:bg-gray-950 bg-gray-100 dark:text-gray-100 text-gray-950" onClick={toggleModal}>Close</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
})

export default HelpComponent;