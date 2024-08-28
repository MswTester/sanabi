import client from "../db";

export async function POST(request: Request) {
    const json = await request.json();
    const tokenCol = client.db("sanabi").collection("tokens");
    const token = await tokenCol.findOne({ key: json.key });
    if (token) {
        await tokenCol.deleteOne({ key: json.key });
        return new Response(JSON.stringify({success:true}), {
            headers: { "content-type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify({success:false}), {
            headers: { "content-type": "application/json" },
        });
    }
}