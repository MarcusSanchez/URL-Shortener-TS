import * as dbh from "./databaseHelpers.js";
export async function getRoot(req, res) {
    try {
        const results = await dbh.renderResults();
        res.render('index', { urls: results });
    }
    catch (error) {
        res.status(500).send(error);
    }
}
export async function postRoot(req, res) {
    try {
        const shortUrl = await dbh.saveURL(req.body.url);
        res.render('result', { url: shortUrl });
    }
    catch (error) {
        res.status(500).send(error);
    }
}
export async function getUrl(req, res) {
    try {
        const url = await dbh.retrieveURL(req.params.base62Key);
        res.redirect(`//${url}`);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
export async function getClear(req, res) {
    try {
        await dbh.clearDB();
        res.redirect('/');
    }
    catch (error) {
        res.status(500).send(error);
    }
}
export async function delUrl(req, res) {
    try {
        await dbh.deleteUrl(req.params[0]);
        res.redirect('/');
    }
    catch (error) {
        res.status(500).send(error);
    }
}
//# sourceMappingURL=handlers.js.map