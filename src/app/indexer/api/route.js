

export async function POST(req) {
    const { videoUrl } = await req.json();
    const INDEXER_API_KEY = process.env.INDEXER_API_KEY;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    /**
     * Need to get PXL account set up on Azure to get the API key and other keys necessary for the API
     * 
     */


}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }