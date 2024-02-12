const express = require("express");
const app = express();
const port = process.env.PORT || 80;
const { StartDb } = require("./src/db/config");
const UserRouter = require("./src/routes/user.routes");

app.use(express.json());
app.use(UserRouter);
// routing
async function startServer() {
  await StartDb();
  app.listen(port, () => console.log(`listening on http://localhost:${port}`));
}

startServer();
