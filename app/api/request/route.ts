import {client, conn} from "../db";

export async function POST(request: Request) {
    await conn();
    const json = await request.json();
    const tokenCol = client.db("sanabi").collection("tokens");
    const token = await tokenCol.findOne({ key: json.key });
    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    } else if (token.expiration < Date.now()) {
        return new Response("Token expired", { status: 401 });
    }
    return new Response(JSON.stringify(token), {
        headers: { "content-type": "application/json" },
    });
}