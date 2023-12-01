const  app = require("./app");
require("dotenv").config();

const HOST = process.env.LOCAL;
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});