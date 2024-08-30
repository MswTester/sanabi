import client from "../db";

export async function GET(request: Request) {
    const tokenCol = client.db("sanabi").collection("tokens");
    const tokens = await tokenCol.find({}).toArray();
    return new Response(JSON.stringify(tokens));
}