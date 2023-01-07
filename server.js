import express from "express";

import sequelize from "./src/configs/database.js";
import router from "./src/routes/routes.js";

const app = express();

// untuk cek koneksi database
try {
  await sequelize.authenticate();
  console.log('Database terkoneksi!');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

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