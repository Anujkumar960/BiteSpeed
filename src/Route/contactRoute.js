const express =require("express");
const { AddContact, getAll } = require("../controller/contactController");

const contactRouter =express.Router();

contactRouter.post("/identify",AddContact);
contactRouter.get("/data",getAll);

module.exports={contactRouter};