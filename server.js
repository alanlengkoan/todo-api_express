import express from "express";

import sequelize from "./src/configs/database.js";
import router from "./src/routes/routes.js";
import {
  Activity
} from "./src/models/activity.js";
import {
  Todo
} from "./src/models/todos.js";

const app = express();

(async () => {
  try {
    // untuk cek koneksi database
    await sequelize.authenticate();
    console.log('Database terkoneksi!');

    // untuk sync database
    await Promise.all([
      Activity.sync({
        force: true
      }),
      Todo.sync({
        force: true
      }),
    ]);
    console.log('Database synchronous!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// untuk body respon
app.use(express.json());

// untuk routes
app.use(router);

// untuk host
const port = 3030;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Server sedang berjalan pada http://${host}:${port}`);
});