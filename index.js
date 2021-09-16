require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const WildersControllers = require("./controllers/Wilders");
const { runAsyncWrapper } = require('./utils/runAsyncWrapper')

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 1234;

//? Debug
mongoose.set('debug', true);

//* Connection db mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (_, res) => {
    res.send("Hello World");
});

// Routes
app.post("/api/wilder", runAsyncWrapper(WildersControllers.create))
app.get("/api/wilder", runAsyncWrapper(WildersControllers.read))
app.put("/api/wilder", runAsyncWrapper(WildersControllers.update))
app.delete("/api/wilder", runAsyncWrapper(WildersControllers.delete))

// 404
app.use((_,res) => res.status(404).json('No match any page with this request'))

// Error personnalisation
app.use((error, req, res, next) => { 
  // Sets HTTP status code
  res.status(error.status || 500)

  // Sends response
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

