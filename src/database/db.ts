import {Db, MongoClient} from "mongodb";

export var db: Db;

export async function setupMongoDB(): Promise<void> {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    db = client.db("URLShortener");
}