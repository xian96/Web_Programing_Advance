const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/", (req, res)=>{
    try{
        const cards = data.cards;
        res.render("index",{cards: cards});
    }catch(e){
        res.status(404).json(`There is an error happend! ==>>${e}<<==`);
    }
});

module.exports = router;