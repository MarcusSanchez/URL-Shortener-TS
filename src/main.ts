import express from 'express';
import {setupMongoDB} from "./database/db.js";
import {startRouting} from "./router/router.js";
import {resolve} from "path";


async function main() {
    try {
        await setupMongoDB();
        console.log("MongoDB connection established");
    } catch(error) {
        console.log("Failure connecting MongoDB:", error);
        process.exit(1);
    }

    const app: express.Express = initExpress();
    const port: number = 3000;

    startRouting(app);

    app.listen(port, () => { console.log("Listening on port:", port)});
}

function initExpress(): express.Express {
    // Initialize Express app
    const app: express.Express = express();
    // Set up EJS as the template engine
    app.set('views', resolve('src/views'))
    app.set('view engine', 'ejs');

    // Middleware
    app.use(express.urlencoded({extended: true}));

    app.use((req, res, next) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
    });

    return app
}

await main();
