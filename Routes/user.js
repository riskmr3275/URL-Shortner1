const express=require("express")
const {handleUserSignUp}=require("../Controller/user")
// const router1 = require("./url")

const router=express.Router()

router.post("/",handleUserSignUp)

module.exports=router
