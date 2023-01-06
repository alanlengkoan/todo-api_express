import express from "express";

import mySql from "./src/configs/database.js";
import router from "./src/routes/routes.js";

const app = express();

// untuk cek koneksi database
mySql.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database terkoneksi!");
    }
});

// untuk body respon
app.use(express.json());

// untuk routes
app.use(router);

// untuk host
const port = 3030;
const host = "localhost";

app.listen(port, host, () => {
    console.log(`Server sedang berjalan pada http://${host}:${port}`);
});