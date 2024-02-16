
export const runtime = 'edge';


 
export async function GET(req) {
    return new Response.json({ hello: 'world' })
}


export async function POST(req, res) {
    const { text } = await req.json();
  
    console.log('Text from form: ', text);
  
    return Response.json({ test: 'hello there' });
}