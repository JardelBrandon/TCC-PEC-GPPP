"use server";

import {NotionDatabaseResponse, ThingToLearn} from "../_interfaces/notion";
import {Client} from "@notionhq/client";

require("dotenv").config();

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

if (!notionDatabaseId || !notionSecret) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
    auth: notionSecret,
});

export async function getDatabase() {
    const notionDatabaseId = "2256ee23187e4002afd75dcc049c791f";

    const query = await notion.databases.query({
        database_id: notionDatabaseId,
    });

    const typedResponse = (query as unknown) as NotionDatabaseResponse;

    console.dir(query, {depth: null});

    return typedResponse.results.map((data) => {
        return {
            label: data.properties.label.rich_text?.[0].plain_text,
            url: data.properties.url.url
        };
    }) as ThingToLearn[];
}
