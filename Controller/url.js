const shortid=require("shortid")
const URL=require("../models/url")

async function handleGenerateNewShortURL(req,res)
{
    const body=req.body;
    const allUrl=URL.find({})
    if(!body.url)  return res.status(400).json({error:"Url required"})
    const shortID=shortid()
    await URL.create(
        {
            shortId:shortID,
            redirectURL:body.url,
            visitHistory:[]
        }
    )
    return res.render("home",{id:shortID

    })
    
}

module.exports={handleGenerateNewShortURL,};
