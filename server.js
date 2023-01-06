import express from "express";

const app = express();

// untuk routes
const port = 3000;
const host = "localhost";

app.listen(port, host, () => {
    console.log(`Server sedang berjalan pada http://${host}:${port}`);
});