const express = require("express");
const router = express.Router();
const WildersControllers = require("./controllers/Wilders");
const { runAsyncWrapper } = require('./utils/runAsyncWrapper')

// Routes
router.post("/wilder", runAsyncWrapper(WildersControllers.create))
router.get("/wilder", runAsyncWrapper(WildersControllers.read))
router.put("/wilder", runAsyncWrapper(WildersControllers.update))
router.delete("/wilder", runAsyncWrapper(WildersControllers.delete))

module.exports = router