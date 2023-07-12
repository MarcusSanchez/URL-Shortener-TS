// URL interface
import {ObjectId, Collection, InsertOneResult} from "mongodb";
import {db} from "../database/db.js"
import {generateShortenedUrl} from "./businessLogicHelpers.js";

export interface URL {
    _id?: ObjectId;
    LongURL: string;
    ShortURL: string;
}

// Render results using EJS template
export async function renderResults(): Promise<URL[]> {
    const collection: Collection<URL> = db.collection('main');
    return await collection.find({}, {projection: {_id: 0}}).toArray() as URL[];
}

// Save URL to the database
export async function saveURL(url: string): Promise<string> {

    const collection: Collection<URL> = db.collection('main');

    let count: number = await collection.countDocuments({LongURL: url});
    if (count !== 0) {
        const result: URL | null = await collection.findOne(
            {LongURL: url},
            {projection: {ShortURL: 1, _id: 0}}
        );
        return (result !== null) ? result.ShortURL : "";
    }

    let shortUrl: string;
    do {
        shortUrl = generateShortenedUrl();
        count = await collection.countDocuments({ShortURL: shortUrl});
    } while (count !== 0);

    const document: URL = {
        LongURL: url,
        ShortURL: shortUrl,
    };

    let result: InsertOneResult<URL> = await collection.insertOne(document);
    if (!result.acknowledged) {
        throw new Error("Error inserting document")
    }

    return shortUrl;
}

// Retrieve URL from the database
export async function retrieveURL(base62Key: string): Promise<string> {
    const key: string = `localhost:3000/s/${base62Key}`;

    const collection: Collection<URL> = db.collection('main');
    const result: URL | null = await collection.findOne(
        {ShortURL: key},
        {projection: {LongURL: 1}}
    );

    if (result === null) {
        throw new Error('URL not found');
    }

    return result.LongURL;
}

// Clear the database
export async function clearDB(): Promise<void> {
    const collection: Collection<URL> = db.collection('main');
    await collection.deleteMany({});
}

// Delete shortened URL from the database
export async function deleteUrl(shortUrl: string): Promise<void> {
    const collection: Collection<URL> = db.collection('main');
    await collection.deleteOne({ShortURL: shortUrl});
}