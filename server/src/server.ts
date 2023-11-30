import http from "http";
import {getActivities, getThingToLearn} from "./_services/notion";

const host = "localhost";
const port = 5000;

// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    function response(cod: number, list: string) {
        console.dir(list, {depth: null});
        res.setHeader("Content-Type", "application/json");
        res.writeHead(cod);
        res.end(list);
    }

    switch (req.url) {
        case "/":
            const list = await getThingToLearn();


            response(200, JSON.stringify(list));
            break;

        case "/projects":
            const listActivities = await getActivities();

            response(200, JSON.stringify(listActivities));
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