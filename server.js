require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { init, debug } = require("./db/database");
const api = require("./router");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 1234;

//* Connection db mongo
init();
debug();

// Test route
app.get("/", (_, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api", api);

// 404
app.use((_, res) =>
  res.status(404).json("No match any page with this request")
);

// Error personnalisation
app.use((error, req, res, next) => {
  // Sets HTTP status code
  res.status(error.status || 500);

  // Sends response
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
