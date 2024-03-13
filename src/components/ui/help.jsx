import { useEffect, useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const HelpComponent = memo(function Help({ modalOpen, setModalOpen }) {

    // const [modalOpen, setModalOpen] = useState(false)

    // Function to toggle the modal
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    useEffect(() => {
        console.log('modalOpen', modalOpen);
    }, [modalOpen])

    const modalVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: -10,
            transition: { // spring
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
            transition: { // spring
                type: 'spring',
                stiffness: 160,
                damping: 10,
                mass: 0.5,
            }
        }
    }

     // Function to close the modal if the backdrop is clicked
     const handleCloseModal = (e) => {
        // Prevent closing modal when clicking inside the modal content
        if (e.target.id === "backdrop") {
            setModalOpen(false);
        }
    };


    return (
        
        <>
            <div className="flex justify-center items-center border-2 rounded-full *:hover:text-gray-500 w-8 h-8 border-gray-950 dark:border-gray-100 hover:cursor-pointer hover:border-gray-500 hover:text-grey-500 transition duration-300" onClick={() => {setModalOpen(!modalOpen)}}>
                <h3 className="text-sm font-semibold leading-none tracking-tight hover:cursor-pointer hover:text-gray-500 transition duration-300">?</h3>
            </div>

            <AnimatePresence>
                <motion.div 
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
                        className="flex flex-col dark:bg-gray-200 dark:text-gray-950 overflow-scroll lg:max-w-40w md:max-w-60w sm:max-w-60w max-w-80w max-h-60 lg:min-w-30w md:min-w-30w sm:min-w-20w lg:min-h-40 lg:max-h-70 md:max-h-70 sm:max-h-70 bg-gray-900 text-gray-100 z-50 relative p-6 " 
                        initial={{ scale: 0.5 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0.5 }}
                        >
                        <div className="flex flex-col w-full dark:bg-gray-400 px-4 py-4 rounded-md bg-gray-800">
                            <h2 className="text-xl  font-semibold">Thumbnail Generator</h2>
                            <p>How-to Guide</p>
                        </div>
                        <h4 className="text-md font-semibold mt-4">Step 1: Select Brand</h4>
                        <h4 className="text-md font-semibold mt-4">Step 2: Select your Segment</h4>
                        <h4 className="text-md font-semibold mt-4">Step 3: Upload your thumbnail image</h4>
                        <h5 className="text-sm ml-4 mt-2">a. Paste your YouTube video URL and pull the current thumbnail</h5>
                        <h5 className="text-sm ml-4 mt-2">b. Upload an image file from your computer</h5>
                        <h5 className="text-sm ml-4 mt-2">c. Drag n Drop an image to upload</h5>
                        <h4 className="text-md font-semibold mt-4">Step 4: Add text if permitted</h4>
                        <h4 className="text-md font-semibold mt-4">Step 5: Click <span className="font-bold underline">Generate Thumbnail</span> to see the finished product!</h4>
                        <h4 className="text-md font-semibold mt-4">Step 6: Toggle the <span className="font-bold underline">Adjust</span> switch to make any changes</h4>
                        <div className="flex">
                            <p className="flex cursor-pointer mt-6 py-2 px-4 rounded-md dark:hover:bg-gray-800 hover:bg-gray-200 duration-200 dark:bg-gray-950 bg-gray-100 dark:text-gray-100 text-gray-950" onClick={() => {setModalOpen(!modalOpen)}}>Close</p>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    )
})

export default HelpComponent;