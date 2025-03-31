// File: app/api/frame-extraction/route.js
import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';
import { Buffer } from 'buffer';
import path from 'path';
import fs from 'fs';
import { tmpdir } from 'os';

const extractVideoId = (url) => {
    try {
        const videoId = ytdl.getURLVideoID(url);
        return videoId;
    } catch (error) {
        console.error('Error extracting video ID:', error);
        return null;
    }
};

export async function POST(req) {
    try {
        const { youtubeUrl, timeInSeconds } = await req.json();
        console.log('Received request for URL:', youtubeUrl, 'at time:', timeInSeconds);

        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Create temporary file paths with unique identifiers
        const timestamp = Date.now();
        const tmpDir = tmpdir();
        const videoPath = path.join(tmpDir, `${videoId}-${timestamp}.mp4`);
        const framePath = path.join(tmpDir, `${videoId}-${timestamp}-frame.jpg`);
        console.log('Temporary file paths:', videoPath, framePath);

        console.log('Downloading video...');
        
        // Download the video
        const videoStream = ytdl(youtubeUrl, { 
            quality: 'highest',
            filter: 'videoonly' // Only download video stream for faster processing
        });

        await new Promise((resolve, reject) => {
            videoStream.pipe(fs.createWriteStream(videoPath))
                .on('finish', resolve)
                .on('error', (err) => {
                    console.error('Error downloading video:', err);
                    reject(err);
                });
        });

        console.log('Video downloaded, extracting frame...');

        // Extract frame using FFmpeg
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .screenshots({
                    timestamps: [timeInSeconds],
                    filename: path.basename(framePath),
                    folder: path.dirname(framePath),
                    size: '1920x1080'
                })
                .on('end', () => {
                    console.log('Frame extracted successfully');
                    resolve();
                })
                .on('error', (err) => {
                    console.error('Error extracting frame:', err);
                    reject(err);
                });
        });

        // Read the frame and convert to base64
        const frameBuffer = fs.readFileSync(framePath);
        const base64Image = `data:image/jpeg;base64,${frameBuffer.toString('base64')}`;

        // Clean up temporary files
        try {
            fs.unlinkSync(videoPath);
            fs.unlinkSync(framePath);
            console.log('Temporary files cleaned up');
        } catch (error) {
            console.warn('Error cleaning up temporary files:', error);
        }

        return NextResponse.json({ base64Image });
    } catch (error) {
        console.error('Error in frame extraction:', error);
        return NextResponse.json(
            { error: 'Error processing video: ' + error.message }, 
            { status: 500 }
        );
    }
}

// Helper function to validate the video URL
function isValidYoutubeUrl(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return pattern.test(url);
}