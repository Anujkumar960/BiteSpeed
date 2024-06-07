const express =require("express");
const cors=require("cors");
const { ConnectToDb } = require("./src/config/connectToDB");

const { contactRouter } = require("./src/Route/contactRoute");


const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());

app.use("/",contactRouter);

app.get("/",(req,res)=>{
 res.json({msg:"Got the data"})
}
)

app.listen(PORT,async()=>{
    await ConnectToDb();
    console.log(`Your Port is Running on http://localhost:${PORT}`)
});