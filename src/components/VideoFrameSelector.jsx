'use client';

import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function VideoFrameSelector({ onFrameSelect }) {
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [embedUrl, setEmbedUrl] = useState('');
    const videoRef = useRef(null);
    
    const handleTimeChange = (value) => {
        setCurrentTime(value);
        if (videoRef.current) {
            videoRef.current.currentTime = value;
        }
    };

    const extractFrame = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/frame-extraction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    youtubeUrl: videoUrl,
                    timeInSeconds: currentTime
                }),
            });

            const data = await response.json();
            console.log('Frame extracted:', data);
            if (data.error) {
                throw new Error(data.error);
            }

            onFrameSelect(data.base64Image);
        } catch (error) {
            console.error('Error extracting frame:', error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loadVideoPreview = () => {
        if (!videoUrl) return;
        
        try {
            // Extract video ID and create embed URL
            const videoId = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
            const newEmbedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
            console.log('Loading video:', newEmbedUrl);
            setEmbedUrl(newEmbedUrl);
        } catch (error) {
            console.error('Error loading video preview:', error);
            alert('Invalid YouTube URL');
        }
    };

    return (
        <div className="grid gap-4 mt-4">
            <div className="flex gap-2">
                <Input
                    placeholder="Enter YouTube URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    type="text"
                />
                <Button 
                    onClick={loadVideoPreview}
                    type="button"
                    disabled={!videoUrl}
                >
                    Load Video
                </Button>
            </div>

            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {embedUrl ? (
                    <iframe
                        ref={videoRef}
                        src={embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title="YouTube video player"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Enter a YouTube URL to preview video
                    </div>
                )}
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium">
                    Time: {currentTime.toFixed(2)} seconds
                </label>
                <Slider
                    value={[currentTime]}
                    onValueChange={(value) => handleTimeChange(value[0])}
                    min={0}
                    max={3600} // 1 hour max
                    step={0.1}
                />
            </div>

            <Button 
                onClick={extractFrame} 
                disabled={isLoading || !embedUrl}
                type="button"
            >
                {isLoading ? 'Extracting Frame...' : 'Extract Frame'}
            </Button>
        </div>
    );
}