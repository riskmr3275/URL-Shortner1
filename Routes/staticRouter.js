const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.render("home", { urls: allUrls });
    } catch (err) {
        console.error("Error fetching URLs:", err);
        return res.status(500).send("Internal Server Error");
    }
});
router.get("/user",(req,res)=>
{
    return res.render("signUp")
})

module.exports = router;
