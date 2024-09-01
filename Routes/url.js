const express=require("express")

const router=express.Router()
const {handleGenerateNewShortURL}=require("../Controller/url")

router.post('/',handleGenerateNewShortURL)

module.exports=router;