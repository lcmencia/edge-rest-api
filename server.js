const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/cars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/cars", async (req, res) => {
    try{
        const results = await db.createCar(req.body);
        res.status(201).json({id: results[0]});
    }catch(err){
        res.status(400).json(err);
    }
    
});

app.get("/cars", async (req, res) => {
    try{
        const cars = await db.getAllCars();
        res.status(200).json({ cars });
    }catch(err){
        res.status(400).json(err);
    }
});

app.patch("/cars/:id", async (req, res) => {
    try{
        const id = await db.updateCar(req.params.id, req.body);
        res.status(200).json({ id });
    }catch(err){
        res.status(400).json(err);
    }
});

app.delete("/cars/:id", async (req, res) => { 
    try{
        await db.deleteCar(req.params.id);
        res.status(200).json({success:true});
    }catch(err){
        res.status(400).json(err);
    }
});

app.listen(1337, () => console.log("server is running on port 1337"));