
export const runtime = 'edge';


 
export async function GET(req) {
    return new Response( 'hello world' )
}


export async function POST(req, res) {
    const { text, file } = await req.json();
  
    console.log('Text from form: ', text);
    console.log('File from form: ', file);
  
    return Response.json({ test: 'hello there' });
}