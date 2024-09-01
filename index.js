const express = require("express");
const { connectToMongoDB } = require('./connect');
const app = express();
const path = require("path");
const PORT = 8001;
const URL = require("./models/url");
const urlRoute = require("./Routes/url");
const staticRoute=require("./Routes/staticRouter")
app.use(express.urlencoded({ extended: false }));  
app.use(express.json());

const userSign=require("./Routes/user")


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));  

connectToMongoDB("mongodb://localhost:27017/shorts-url").then(() => console.log("MongoDB Connected"));

// Mount the URL routes
app.use("/url", urlRoute);

app.use("/user",staticRoute)
// Define route for short URLs
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                                  }
                }
            }
        );
        if (entry) {
            return res.redirect(entry.redirectURL);
        } else {
            return res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// Define route for testing
app.get("/api/test", async (req, res) => {
    try {
        const allUrl = await URL.find({});
        return res.render("home",{urls:allUrl});
        // return res.end(`<html>
        //                 <head></head>
        //                 <body>
        //                     <ol>
        //                       ${allUrl.map(url=>`<li>${url.shortId}     -    ${url.redirectURL}    -    ${url.visitHistory.length}}</li>`).join("")}
        //                     </ol>
        //                 </body>
        //               </html>
        // `)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});





app.use("/signup",staticRoute)

app.listen(PORT, () => console.log(`Server started on port number: ${PORT}`));













