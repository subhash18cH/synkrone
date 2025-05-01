const express=require("express");
const { addUserProfile } = require("../controllers/profileCOntroller");
const { validateToken } = require("../middlewares/validateToken");

const router=express.Router();
router.use(validateToken)

router.post("/add-info",addUserProfile);
router.get("/",getUserProfile);
router.get("/",getAllProfiles);
router.get("/developers",getAllDevelopers);
router.get("/marketers",getAllMarketers);
router.delete("/",deleteProfile);
router.put("/",updateProfile);
router.get("/by-id/:id",getProfileById);

module.exports= router;