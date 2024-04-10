import express from "express";

const routes = express.Router()


routes.get('/menu',async (req,res) => {
    console.log('LUis');
    try {
        res.json(data)
    } catch (error) {
        res.send(500).json({error:'Server error', message: error.message})
    }
})

export default routes;