const express = require("express");
const { StartDb } = require("./src/db/config");
const UserRouter = require("./src/routes/user.routes");
const app = express();
const port = 80;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  if (req.body?.email === undefined || req.body?.password === undefined) {
    return res.send("Invalid request");
  } else {
    next();
  }
});

app.use(UserRouter);

async function startServer() {
  try {
    await StartDb();
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  } catch (error) {
    console.log("Error while starting server", error);
  }
}

startServer();
