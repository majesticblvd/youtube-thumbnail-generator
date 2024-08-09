'use client'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";


export default function IndexerPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const query = {
            videoUrl: videoUrl,
        }

        try {
            const response = await fetch('/indexer/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Failed to index video:', error);
        }
    }

    return (
        <Card className="m-4 p-4" >
            <form onSubmit={handleSubmit}>
                <CardHeader className="pb-0">
                    <div className="flex flex-col">
                        <CardTitle>Video Indexer</CardTitle>
                        <CardDescription>Know your video inside and out</CardDescription>
                    </div>
                </CardHeader>
                <div className="my-2 flex flex-col">
                    <input 
                        type="text" 
                        placeholder="Enter video URL" 
                        className="p-2 border border-gray-300 rounded-lg text-black" 
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)} 
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white rounded-lg p-2 mt-2"
                    >
                        Index Video
                    </button>
                </div>
            </form>
            {result && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardDescription className="text-green-500">{result}</CardDescription>
                </motion.div>
            )}
        </Card>
    );
}