import express from 'express';
import { setupMongoDB } from "./database/db.js";
import { startRouting } from "./router/router.js";
import { resolve } from "path";
async function main() {
    try {
        await setupMongoDB();
        console.log("MongoDB connection established");
    }
    catch (error) {
        console.log("Failure connecting MongoDB:", error);
        process.exit(1);
    }
    const app = initExpress();
    const port = 3000;
    startRouting(app);
    app.listen(port, () => { console.log("Listening on port:", port); });
}
function initExpress() {
    const app = express();
    app.set('views', resolve('src/views'));
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
    });
    return app;
}
await main();
//# sourceMappingURL=main.js.map