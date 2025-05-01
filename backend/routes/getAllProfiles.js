const express=require("express");
const { getAllProfiles } = require("../controllers/profileCOntroller");
const router=express.Router();

router.get("/",getAllProfiles);

module.exports= router;