const express=require("express");
const { swipeProfile, sentRequests, receivedRequests } = require("../controllers/swipeController");
const { validateToken } = require("../middlewares/validateToken");

const router=express.Router();

router.use(validateToken);

router.post("/",swipeProfile);
router.get("/sent",sentRequests);
router.get("/received",receivedRequests);

module.exports= router;