import { MongoClient } from "mongodb";
export var db;
export async function setupMongoDB() {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    db = client.db("URLShortener");
}
//# sourceMappingURL=db.js.map