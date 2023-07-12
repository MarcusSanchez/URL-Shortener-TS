import { db } from "../database/db.js";
import { generateShortenedUrl } from "./businessLogicHelpers.js";
export async function renderResults() {
    const collection = db.collection('main');
    return await collection.find({}, { projection: { _id: 0 } }).toArray();
}
export async function saveURL(url) {
    const collection = db.collection('main');
    let count = await collection.countDocuments({ LongURL: url });
    if (count !== 0) {
        const result = await collection.findOne({ LongURL: url }, { projection: { ShortURL: 1, _id: 0 } });
        return (result !== null) ? result.ShortURL : "";
    }
    let shortUrl;
    do {
        shortUrl = generateShortenedUrl();
        count = await collection.countDocuments({ ShortURL: shortUrl });
    } while (count !== 0);
    const document = {
        LongURL: url,
        ShortURL: shortUrl,
    };
    let result = await collection.insertOne(document);
    if (!result.acknowledged) {
        throw new Error("Error inserting document");
    }
    return shortUrl;
}
export async function retrieveURL(base62Key) {
    const key = `localhost:3000/s/${base62Key}`;
    const collection = db.collection('main');
    const result = await collection.findOne({ ShortURL: key }, { projection: { LongURL: 1 } });
    if (result === null) {
        throw new Error('URL not found');
    }
    return result.LongURL;
}
export async function clearDB() {
    const collection = db.collection('main');
    await collection.deleteMany({});
}
export async function deleteUrl(shortUrl) {
    const collection = db.collection('main');
    await collection.deleteOne({ ShortURL: shortUrl });
}
//# sourceMappingURL=databaseHelpers.js.map