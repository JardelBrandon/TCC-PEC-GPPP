"use server";

import {NotionDatabaseResponse, ThingToLearn} from "../_interfaces/notion";
import {Activities, ActivitiesDatabaseResponse} from "../_interfaces/notionActivities";
import {Client} from "@notionhq/client";

require("dotenv").config();

const NOTION_SECRET = process.env.NOTION_SECRET;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_DATABASE_ID || !NOTION_SECRET) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
    auth: NOTION_SECRET,
});

export async function getDatabase(NOTION_DATABASE_ID: string) {

    const query = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
    });

    console.dir(query, {depth: null});

    return query;
}

export async function getThingToLearn() {
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_THING_TO_LEARN_ID as string;

    const typedResponse = await (getDatabase(NOTION_DATABASE_ID) as unknown) as NotionDatabaseResponse;

    // console.log(typedResponse);

    return typedResponse.results.map((data) => {
        return {
            label: data.properties.label.rich_text?.[0].plain_text,
            url: data.properties.url.url
        };
    }) as ThingToLearn[];
}

export async function getActivities() {
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ACTIVITIES_ID as string;

    const filteredRows = async () => {
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            "filter": {
                "property": 'Do Dates',
                "rollup": {
                    "any": {
                        "date": {
                            "next_week": {}
                        }
                    }
                }
            },
        });
        console.dir(response, {depth: null})
        return response;
    }

    const typedResponse = await (filteredRows() as unknown) as ActivitiesDatabaseResponse
    let id = 0;

    return typedResponse.results.map((data) => {
        return {
            name: data.properties.Name.title[0].plain_text,
            budget: data.properties.Budget.number as string|unknown,
            category: {
                    id:"asdf",
                    name:"Notion"
                },
            cost: data.properties.Cost.rollup.number,
            services: [
                {
                    // relation: data.properties.Tasks.relation
                    // relation: "asdf"
                }
            ],
            id: ++id
        };
    }) as Activities[];
}
