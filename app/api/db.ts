import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI || `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.qo3ekyu.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const init = async () => {
    await client.connect();
    console.log("Connected to MongoDB");
}
init()

export default client;