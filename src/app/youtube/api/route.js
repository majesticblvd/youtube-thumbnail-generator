import path from 'path';
import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';

export async function POST(req) {
    const { youtubeUrl } = await req.json();
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const videoId = extractVideoId(youtubeUrl);
  
    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
  
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`);
      const data = await response.json();
    //   console.log('data is here: ', data.items[0].snippet); // gives metadata of the video
      if (data.items.length > 0) {
        const thumbnailUrl = data.items[0].snippet.thumbnails.high.url;
        // console.log('thumbnail url is here: ', thumbnailUrl);
        const base64Image = await convertImageToBase64(thumbnailUrl);
        // console.log('base64Image is here: ', base64Image);

        const responseData = {
            thumbnailUrl: thumbnailUrl,
            base64Image: base64Image,
        };

        return new Response( JSON.stringify(responseData) ,{ status:200 } )
      } else {
        return NextResponse.json({ error: 'No data found for this video' });
      }
    } catch (error) {
      console.error('Failed to fetch YouTube thumbnail:', error);
      return NextResponse.json({ error: 'Failed to fetch YouTube thumbnail' });
    }
  }
  

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }

  async function convertImageToBase64(thumbnailUrl) {
    try {
      const response = await fetch(thumbnailUrl);
      const arrayBuffer = await response.arrayBuffer(); // Fetch the image as an array buffer
      const buffer = Buffer.from(arrayBuffer); // Convert the array buffer to a Buffer
      const base64Image = buffer.toString('base64'); // Convert the Buffer to a base64 string
      return `data:image/jpeg;base64,${base64Image}`; // This is the base64-encoded image string, prefixed with MIME type
    } catch (error) {
      console.error('Failed to convert image to base64:', error);
      return null; // Handle errors as appropriate for your application
    }
  }
  