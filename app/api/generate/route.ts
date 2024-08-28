import client from "../db";

export async function POST(request: Request) {
    const json = await request.json();
    const tokenCol = client.db("sanabi").collection("tokens");
    const token = await tokenCol.findOne({ key: json.key });
    if (token) {
        return new Response("Already exists", { status: 401 });
    } else if (json.expiration < Date.now()) {
        return new Response("Token expired", { status: 401 });
    }
    const res = await tokenCol.insertOne({
        key: json.key,
        perms: json.perms,
        expiration: json.expiration,
        using: false,
    } as Token);
    return new Response(JSON.stringify(res), {
        headers: { "content-type": "application/json" },
    });
}