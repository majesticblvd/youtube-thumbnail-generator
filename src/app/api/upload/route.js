
export const runtime = 'edge';


 
export async function GET(req) {
    return new Response.json({ hello: 'world' })
}


export async function POST(req, res) {
    
  }