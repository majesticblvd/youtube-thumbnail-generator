
export const runtime = 'edge';


 
export async function GET(req) {
    return new Response( 'hello world' )
}


export async function POST(req, res) {
    const { text, file } = await req.json();

    // manipulate the data 
  
  
    return Response.json({ test: 'hello there' });
}