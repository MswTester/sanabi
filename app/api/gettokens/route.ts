import {client, conn} from "../db";

export async function GET(request: Request) {
    await conn();
    const tokenCol = client.db("sanabi").collection("tokens");
    const tokens = await tokenCol.find().toArray();
    return new Response(JSON.stringify(tokens));
}