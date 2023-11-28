import http from "http";
import {getDatabase} from "./services/notion";

const host = "localhost";
const port = 8000;

// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");


    switch (req.url) {
        case "/":
            // Query the database and wait for the result
            const list = await getDatabase();

            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(list));
            break;

        default:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});