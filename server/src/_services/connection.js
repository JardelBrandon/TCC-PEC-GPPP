const {Client} = require("@notionhq/client");

require("dotenv").config();

const NOTION_SECRET = process.env.NOTION_SECRET;

if (!NOTION_SECRET) {
    throw Error("Must define NOTION_SECRET in env");
}

const notion = new Client({
    auth: NOTION_SECRET,
});

module.exports = notion;