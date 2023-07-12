import express from "express"
import * as dbh from "./databaseHelpers.js"

// Routes
export async function getRoot(req: express.Request, res: express.Response): Promise<void> {
    try {
        const results: dbh.URL[] = await dbh.renderResults();
        res.render('index', {urls: results});
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postRoot(req: express.Request, res: express.Response): Promise<void> {
    try {
        const shortUrl: string = await dbh.saveURL(req.body.url);
        res.render('result', {url: shortUrl});
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUrl(req: express.Request, res: express.Response): Promise<void> {
    try {
        const url: string = await dbh.retrieveURL(req.params.base62Key);
        res.redirect(`//${url}`);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getClear(req: express.Request, res: express.Response): Promise<void> {
    try {
        await dbh.clearDB();
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function delUrl(req: express.Request, res: express.Response): Promise<void> {
    try {
        await dbh.deleteUrl(req.params[0]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
}