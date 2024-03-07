import express from "express";

const router = express.Router()


router.get('/menu',async (req,res) => {
    try {
        res.json(burgers)
    } catch (error) {
        res.send(500).json({error:'Server error', message: error.message})
    }
})

export default router;