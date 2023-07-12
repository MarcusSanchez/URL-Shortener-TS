import * as handlers from "../handlers/handlers.js";
export function startRouting(app) {
    app.get('/', handlers.getRoot);
    app.post('/', handlers.postRoot);
    app.get('/s/:base62Key', handlers.getUrl);
    app.get('/clear', handlers.getClear);
    app.get('/d/*', handlers.delUrl);
}
//# sourceMappingURL=router.js.map